import { useEffect, useState } from 'react';
import LoginPage from './loginPage/loginPage';
import AuthTimer from './timmer/authTimer';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function mainPage() {

    const [loggedIn, setloggedIn] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.multiGet(["userName", "password"]);

          const userName = data[0][1]; // Extracting the value of 'userName'
          const password = data[1][1]; // Extracting the value of 'password'
            console.log("get cache data ",userName," ",password);
          if (null != userName && userName && null != password && password) {
            if(!verifyUserAndLogin(userName, password)){
                console.warn("Auto login fail");
            }
          }
        } catch (error) {
          console.error("while fetching user data from cache in useeffect");
        }
      };
      fetchData();
    }, []);
    
    
    const storeDataInCache=(username: string,password:string)=>{
        try {
            console.log("Storing data in cache ",username," ",password);
            AsyncStorage.multiSet([
                ['userName',username],
                ['password',password]
            ])
        } catch (error) {
            console.error("Occured while storing data in cache in storeDataInCache ",error);
        }
    }

    //call to server to verify user and get auth key
    const verifyUserAndLogin=(username: string,password:string)=>{
        //also verify from server
        console.log("Verifying user ",username," ",password);
        if(null!=username && username && null!=password && password){
            setloggedIn(true);
            return true;
        }
    }

    const tryLogin=(username: string,password:string)=>{
        console.log(username);
        
        if(null!=username && username && null!=password && password){
            if(verifyUserAndLogin(username,password)){
                storeDataInCache(username,password);
            }
        }
    }
    return(
        <>
        {loggedIn
            ?  ( <AuthTimer/> )
            :  ( <LoginPage tryLogin={tryLogin} />  )
        }
        </>
    )
    
}
