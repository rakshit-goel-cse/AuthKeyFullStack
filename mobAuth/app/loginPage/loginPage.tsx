import {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { registerUser } from '../server/userService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ChildComponentProps = {
    tryLogin: (username: string,password:string) => void;
  };

export default function LoginPage({tryLogin}:ChildComponentProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setshowPass] = useState(false);

    const registerNewUser = () =>{
        console.log("trying register -- ",isLogin,userName,password);
        if(!isLogin && null!=userName && userName && null!=password && password){
            registerUser(userName,password);
            setIsLogin(true);
            setUserName("");
            setPassword("");
        }
    }

    const loginItem = () => {
        return (
            <>
                <View style={{ marginVertical: 10 }}>
                    <Text style={style.userName}>UserName:</Text>
                    <TextInput 
                        placeholder='UserName'
                        value={userName}
                        onChangeText={setUserName}
                        style={style.userNameInput}
                        autoCapitalize='none'
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={style.userName}>Password:</Text>
                    <TextInput 
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        style={style.userNameInput}
                        autoCapitalize='none'
                        secureTextEntry={isLogin && !showPass}
                    />
                    {isLogin &&
                    <MaterialCommunityIcons
                        name={!showPass ? 'eye-off' : 'eye'}
                        size={24}
                        color="#aaa"
                        style={style.icon}
                        onPress={()=>setshowPass(prev=>!prev)}
                    />}

                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-evenly" ,marginTop:20}}>
                    <Button
                        disabled={!isLogin}
                        title='Login'
                        onPress={() => { tryLogin(userName,password) }}
                    />
                    <Button
                        disabled={isLogin}
                        title='Register'
                        onPress={() => { registerNewUser() }}
                    />
                </View>

                <Text 
                    style={style.linked}
                    onPress={() => setIsLogin(prev => !prev)}
                >
                    {isLogin ? "Register User" : "Login User"}
                </Text>
            </>
        );
    }

    return (
        <KeyboardAvoidingView
            style={style.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={style.itemBox}>
                    {loginItem()}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
  container: {    
    backgroundColor: "darkorange",
    height:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemBox: {
    backgroundColor: "white",
    height: "60%",
    width: "70%",
    borderRadius: 20,
    borderStartColor: "red",
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  userName:{
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  userNameInput:{
    borderWidth: 1,
    padding: 10,
  },
  linked:{
    textAlign: "center",
    paddingTop: 10,
    marginTop: 20,
    fontWeight: "bold",
    color: "blue",
  },
  icon:{
    position:"relative",
    alignSelf:"flex-end",
    marginTop:-35,
    marginBottom:10,
    marginRight:5,
    zIndex:10
  }
});
