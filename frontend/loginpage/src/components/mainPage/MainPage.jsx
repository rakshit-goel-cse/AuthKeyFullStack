import React, { useEffect, useState } from 'react';
import NotificationBuilder from './NotificationBuilder';

import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
var stompClient=null;
const url="http://localhost:8080/ping";


export default function MainPage({username}) {
    const [msg, setmsg] = useState('');

    const [NotificationList, setNotificationList] = useState([
        {
          id:1,
          type:'ping',
          msg:''
        },
        {
          id:2,
          type:'msg',
          msg:'wjkckj wmbcjwhbcik qhcqhuwvy'
        }
      ]);

      const sendPing = () =>{
        console.log("pinged")
        sendMsgToServer("type-ping",username);
    }

    const sendMsg = () =>{
        if(null!=msg && msg){
            console.log(msg);
            sendMsgToServer(msg,username);
            setmsg('')
        }
    }


 /**Stomp Client */
 var msgUniqueKey=3;
    
 useEffect(() => {
     const url = "http://localhost:8080/ping";
     const sockjs = new SockJS(url);

     stompClient = new Client({
         webSocketFactory: () => sockjs,
         connectHeaders: {},
         debug: (str) => {
             console.log(str);
         },
         onConnect: (frame) => {
             console.log(`/user/${username}/web` +"Connected: ", frame);
             // Subscribe to user's messages /user/msg/${userName}
             stompClient.subscribe(`/user/${username}/web`, (payload) => {
                 const data = JSON.parse(payload.body);
                   setNotificationList((prev) => [...prev, {
                       id:msgUniqueKey++,
                       type:data.msg===""?"ping":"msg",
                       msg:data.msg
                   }]);
                 console.log("Received message: ", data);
             });
         },
         onStompError: (error) => {
             console.error("STOMP Error: ", error);
         },
         onWebSocketError: (error) => {
             console.error("WebSocket Error: ", error);
         },
     });

     // Activate the STOMP client
     stompClient.activate();

     // Clean up when component unmounts
     return () => {
         stompClient.deactivate();
     };
 }, []);

 const sendMsgToServer = (data,userName) =>{
  const dataToSend = {
      userName: userName,
      Type: data === "type-ping" ? "ping" : "msg",
      msg: data === "type-ping" ? "" : data,
  };
  console.log("publish msg");
   // Send a message
   if (stompClient && stompClient.connected) {
      console.log("Publishing message");
      stompClient.publish({
          destination: "/ping/app",
          body: JSON.stringify(dataToSend)
      });
    } else {
      console.error("STOMP client is not connected.");
      //setting error notification
      setNotificationList((prev) => [...prev, {
        id:msgUniqueKey++,
        type:"error",
        msg:""
        }]);
    }
}


    return(
        <div className='h-screen w-screen bg-lime-400'>
        {/*
          <msgReciever username={username} recieveMsg={recieveMsg}/>
         */}
        <NotificationBuilder NotificationList={NotificationList} setNotificationList={setNotificationList} />

        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <button className='text-3xl bg-lime-500 rounded-2xl p-1'
            onClick={sendPing}
            >Ping</button>
            <input className='text-3xl mt-6 mb-3 rounded-3xl p-1 px-3'
            value={msg}
            onChange={(e)=>setmsg(e.target.value)}/>
            <button className='text-3xl bg-lime-500 rounded-2xl p-1'
            onClick={sendMsg}
            >Send</button>
        </div>
        </div>
    )
}

