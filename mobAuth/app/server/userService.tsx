import { useEffect, useState } from "react"
const IP="192.168.29.231";
export const verifyUser=async(userName,password) =>{
    
    try{
        const res=await fetch(`http://${IP}:8080/user/loginByPassword`,
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'username':userName,
                'password':password,
            })
        })

        //console.info("main res--- ",res);
        if(res.ok){
            return('OK');
        }
        else{
            return(res.text())
        }
    }
    catch(error){
        console.error("error while login- ",error);
        return("Some error occured");
    }

}

export const registerUser=async(userName,password) =>{
    try{
        const url = `http://${IP}:8080/user/register?userName=${userName}&password=${password}`;
        const res = await fetch(url,{
            method:"POST",
            
        })
    }catch(error){
        console.error("Error while registering user ",error);
    }
}


export const setAuthKey=async(username,password,authKey)=>{
    try{
        console.log("setauthCode- ",authKey);
        const url=`http://${IP}:8080/user/authKey?userName=${username}&password=${password}&authkey=${authKey}`;
    await fetch(url,
        {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
            },
        }).then((res)=>!res.ok?console.log(res.json()):'')
    }
    catch(error){
        console.error("Error while setting AuthKey--- ",error);
    }
}
