
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export default function AuthTimer() {
    const [authCode, setauthCode] = useState('');

    useEffect(() => {
        generateAuthCode()
    }, [])
    

    const generateAuthCode = () =>{
        let key = Math.floor(100000 + Math.random() * 900000);
        setauthCode(key.toString());
        return true;
    }

    return(
        <View style={style.container}>
            <CountdownCircleTimer
            isPlaying
            duration={10}
            strokeWidth={10}
            trailStrokeWidth={6}
            isGrowing={true}
            size={230}
            colors={'#004777'}
            onComplete={()=>{
                    generateAuthCode();
                    return { shouldRepeat: true, delay: 0 }
                }}
            >
                {()=>(
                    <Text style={style.text}>{authCode}</Text>
                )}
            </CountdownCircleTimer>
        </View>
    )
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
    }
  });