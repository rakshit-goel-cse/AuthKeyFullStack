import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet,View,Text,TextInput } from "react-native";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const IP="192.168.29.231";
// @ts-ignore
var stompClient: Client;
export default function MsgArea({userName}){
    const [connected,setConnect] = useState(false);
    const [typeMsg, settypeMsg] = useState('');
    const [msg, setmsg] = useState([
        {
            type:"",
            msg:""
        },
        {
            type:"msg",
            msg:"kbwkhbdqkqw"
        },
        {
            type:"ping",
            msg:""
        }
    ]);

    const gotMsg=(data)=>{
        console.log(data);
        if(data.type!=null && data.msg!=null){
            setmsg((prev)=>[
                ...prev.slice(1)
                ,{
                    type:data.Type,
                    msg:data.msg
                }
            ])
        }
    }

    useEffect(() => {
        const url="http://"+IP+":8080/ping";
        const sock=new SockJS(url);
        console.log("trying to connect");
        stompClient=new Client({
            webSocketFactory:()=>sock,
            connectHeaders:{},
            debug:(str)=>console.log(str),
            onConnect:(frame)=>{
                console.log("Connected websock -",frame);
                stompClient.subscribe(`/user/${userName}/app`,(payload)=>gotMsg(JSON.parse(payload.body)));
                setConnect(true);
            },
            onStompError:(err)=>console.error(err),
            onWebSocketError:(err)=>console.error(err),
        });

        stompClient.activate();

      return () => {
        stompClient.deactivate();
      }
    }, []);
    

    const sendMsg=()=>{
        if(stompClient && stompClient.connected){
            const data={
                userName:userName,
                Type:typeMsg===""?"ping":"msg",
                msg:typeMsg
            }
            stompClient.publish({
                destination:"/ping/web",
                body:JSON.stringify(data)
            })
        }
        else{console.error("websocket not connected")}

        settypeMsg("");
    }


    return(
        <>
        {connected &&
        <View style={style.msgScreen}>
                {   
                    msg.map((value,index)=>{
                        return <Text key={index} 
                                    style={[
                                        style.textStyle ,
                                        value.type==="ping"?style.ping:style.msg,
                                        value.type===""?{opacity:0}:{opacity:0.3+0.25*index}
                                    ]}>
                                    {value.type==="ping"?"You Got Pinged":value.msg}
                                </Text>
                    })
                }
                <View style={style.msgSend}>
                    <TextInput style={{width:"80%",backgroundColor:"#2aebaa",flex:1}}
                        value={typeMsg} onChangeText={(value)=>settypeMsg(value)}
                        placeholder="Type msg or send empty for Ping"
                    />
                    <MaterialCommunityIcons
                        name={"send-circle-outline"}
                        style={{width:"10%"}}
                        size={30}
                        onPress={()=>sendMsg()}

                    />
                </View>
            </View>
            }
            </>
    )
}


const style=StyleSheet.create({
    msgScreen:{
        position:"absolute",
        bottom:0,
        width:"80%",
        alignItems:"center"
    },
    textStyle:{
        width:"100%",
        textAlign:"center",
        borderRadius:8
    },
    ping:{
        color:"red",
        backgroundColor:"green",
    },
    msg:{
        color:"green",
        backgroundColor:"orange",
    },
    msgSend:{
        width:"100%",
        margin:1,
        flexDirection:"row",
        justifyContent:"space-between"
    },
})