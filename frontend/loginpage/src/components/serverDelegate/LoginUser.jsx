import React from 'react';

export default async function loginUser(userName,authKey) {
    console.log(userName,authKey);
    const result = await fetch("http://localhost:8080/user/loginByKey",  
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'username':userName,
                'securitykey':authKey,
            })
        })
        .then(response => {
            if(response.ok){
                return ('OK'); 
            }
            if(response.status===409){
                console.log("jhjygjvj");
                return response.text();
            }
            return response.json();
        })
        .then(data=>{
            return data;
        })
        .catch(error=>{
            console.error("Error while login ",error);
            return('Some Error Occured While Login');
        })
        console.info('Result-- ',result);
        return result;
}