import { useEffect, useState } from "react";
import LoginPage from "./loginPage/loginPage";
import AuthTimer from "./timmer/authTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyUser } from "./server/userService";

const timeGapInLogIn = 1000000;//1 * 24 * 60 * 60 * 1000; //1 day
export default function mainPage() {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.multiGet([
          "userName",
          "password",
          "time",
        ]);

        const userName = data[0][1]; // Extracting the value of 'userName'
        const password = data[1][1]; // Extracting the value of 'password'
        const lastCredTime = data[2][1]; // Extracting the value of 'password'
        console.log(
          "get cache data ",
          userName,
          " ",
          password,
          " ",
          lastCredTime
        );

        if (
          null != userName &&
          userName &&
          null != password &&
          password &&
          null != lastCredTime &&
          lastCredTime
        ) {
          const lastTime = parseInt(lastCredTime, 10);
          if (!isNaN(lastTime) && Date.now() - lastTime < timeGapInLogIn) {
            if (!verifyUserAndLogin(userName, password)) {
              console.warn("Auto login fail");
              deleteDataInCache();
            }
          } else {
            deleteDataInCache();
          }
        }
      } catch (error) {
        console.error("while fetching user data from cache in useeffect ",error);
      }
    };
    fetchData();
  }, []);

  const storeDataInCache = (username: string, password: string) => {
    try {
      console.log(
        "Storing data in cache ",
        username,
        " ",
        password,
        " ",
        Date.now().toString()
      );
      AsyncStorage.multiSet([
        ["userName", username],
        ["password", password],
        ["time", Date.now().toString()],
      ]);
    } catch (error) {
      console.error(
        "Occured while storing data in cache in storeDataInCache ",
        error
      );
    }
  };

  const deleteDataInCache = () => {
    try {
      AsyncStorage.removeItem("userName");
      AsyncStorage.removeItem("password");
      AsyncStorage.removeItem("time");
    } catch (error) {}
  };

  //call to server to verify user and get auth key
  const verifyUserAndLogin = async(username: string, password: string) => {
    //also verify from server
    console.log("Verifying user ", username, " ", password);
    if (null != username && username && null != password && password) {
      const result = await verifyUser(username, password);
      console.log("result-- ",result);
      if (result === "OK") {
        setloggedIn(true);
        return true;
      }
      return false;
    }
  };

  const tryLogin =async (username: string, password: string) => {
    console.log(username);

    if (null != username && username && null != password && password) {
        const isLoggedIn=await verifyUserAndLogin(username, password);
        console.log("isloggedin --",isLoggedIn );
        if (isLoggedIn) {
        storeDataInCache(username, password);
      }
    }
  };

  const tryLogOut =()=>{
    deleteDataInCache();
    setloggedIn(false);
  }

  return (
    <>
      {loggedIn ? (
        <AuthTimer tryLogOut={tryLogOut} />
      ) : (
        <LoginPage tryLogin={tryLogin} />
      )}
    </>
  );
}
