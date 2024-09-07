import React, { useEffect } from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
var stompClient=null;
const url="http://localhost:8080/ping";

export default function MsgReceiver({ userName, recieveMsg }) {
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
                console.log("Connected: ", frame);
                // Subscribe to user's messages /user/msg/${userName}
                stompClient.subscribe(`/topic`, (payload) => {
                    const data = JSON.parse(payload.body);
                    {/*
                      setNotificationList((prev) => [...prev, {
                          id:msgUniqueKey++,
                          type:data.msg===""?"ping":"msg",
                          msg:data.msg
                      }]);
                     */}
                     recieveMsg(data.msg);
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

    return <></>;
}


export const sendMsgToServer = (data,userName) =>{
    const dataToSend = {
        userName: userName,
        Type: data === "type-ping" ? "ping" : "msg",
        msg: data === "type-ping" ? "" : data,
    };
    console.log("publish msg");
   /*
      stompClient.publish({
          destination: "msg/msg",
          body: JSON.stringify(dataToSend)
      });
    */
     // Send a message
     if (stompClient && stompClient.connected) {
        console.log("Publishing message");
        stompClient.publish({
            destination: "/app/msg",
            body: JSON.stringify(dataToSend)
        });
      } else {
        console.error("STOMP client is not connected.");
      }
}
