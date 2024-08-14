import React, { useState } from 'react';
import NotificationBuilder from './NotificationBuilder';

export default function MainPage(params) {
    const [msg, setmsg] = useState('');
    
    const sendPing = () =>{
        console.log("pinged")
    }

    const sendMsg = () =>{
        if(null!=msg && msg){
            console.log(msg);
            setmsg('')
        }
    }

    return(
        <div className='h-screen w-screen bg-lime-400'>

        <NotificationBuilder/>

        <div className='flex flex-col h-screen w-screen justify-center items-center'>
            <button className='text-3xl bg-lime-500 rounded-2xl p-1'
            onClick={sendPing}
            >Ping</button>
            <input className='text-3xl mt-6 mb-3 rounded-3xl p-1 px-3'
            value={msg}
            onChange={(e)=>setmsg(e.target.value)}/>
            <button className='text-3xl bg-lime-500 rounded-2xl p-1'
            onClick={sendMsg}
            >Send</button>
        </div>
        </div>
    )
}