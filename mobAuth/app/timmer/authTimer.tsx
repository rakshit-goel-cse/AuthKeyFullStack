
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { setAuthKey } from "../server/userService";
import MsgArea from "./MsgArea";


export default function AuthTimer({tryLogOut}) {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [authCode, setauthCode] = useState('');

    useEffect(() => {
        const fetchUserName=async()=>{
            try{
                const value=await AsyncStorage.multiGet(["userName","password"]);
                if(value!==null){
                    if(null!==value[0][1]){
                        setuserName(value[0][1]);
                    }
                    if(null!==value[1][1]){
                        setpassword(value[1][1]);
                    }
                    generateAuthCode(value[0][1],value[1][1]);
                }

                //create websocket
                if(null!==userName && ""!==userName){

                }
            }
            catch(error){
                console.error(error);
            }
        };
        fetchUserName();
        
    }, []);
    

    const generateAuthCode = async (userName,password) => {
      //console.log("generateAuthCode");
      if (null != userName && userName && null != password && password) {
        let key = Math.floor(100000 + Math.random() * 900000);
        await setAuthKey(userName, password, key.toString());
        setauthCode(key.toString());
      } else {
        console.error("data missing while generateAuthCode");
      }
      return true;
    };

    return (
      <View style={style.container}>
        <View style={style.nameContainer}>
          <Text style={style.userNameText}>{userName}</Text>
          <Text style={style.logOutStyle} onPress={() => tryLogOut()}>
            LogOut
          </Text>
        </View>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={10}
          trailStrokeWidth={6}
          isGrowing={true}
          size={230}
          colors={"#004777"}
          onComplete={() => {
            generateAuthCode(userName, password);
            return { shouldRepeat: true, delay: 0 };
          }}
        >
          {() => <Text style={style.text}>{authCode}</Text>}
        </CountdownCircleTimer>

        {/*chat*/}
        {null !== userName && "" !== userName && (
          <MsgArea userName={userName} />
        )}
      </View>
    );
}

const style = StyleSheet.create({
   
    container: {    
      backgroundColor: "rgb(79, 181, 232)",
      height:"100%",
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
        fontSize:30,
        fontWeight:"bold",
        letterSpacing:1,
    },
    nameContainer:{
        position:"absolute",
        top:0,
        width:"100%",
        flexDirection:"row",
        padding:"10%",
        justifyContent:"space-between"
    },
    userNameText:{
        fontSize:24,
        textShadowColor:"green-light",
        color:"black",
        textShadowOffset:{width:-1, height:1},
        textShadowRadius:4,
    },
    logOutStyle:{
        fontWeight:"600",
        color:"red",
        textShadowColor:"yellow",
        textShadowOffset:{width:-1, height:1},
        textShadowRadius:4,
        fontSize:20,
        marginRight:"-5%"
    }
  });