import React, { useEffect, useState } from 'react';
import Notification from './Notification';
import msgRecieve from '../serverDelegate/MsgReciever';


export default function NotificationBuilder(params) {

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

    {/*
      {
        id:unique,
        type:ping/msg/send2
        msg:""
      }
     */}

     useEffect(() => {
       //msgRecieve(setNotificationList);
     
     }, []);
     

     const removeNotification =(id)=>{
        setNotificationList((prev)=>{
          console.warn(prev)
          return prev.filter((value)=>value.id!=id);
        })
     }

     return(
        <div id='NotBuild' className='fixed end-6 w-1/6 h-screen my-14'>
            {NotificationList.map((value,index)=>{
               return <Notification key={value.id} {...value} removeNoti={removeNotification}/>
            })}
        </div>
     )
    
}