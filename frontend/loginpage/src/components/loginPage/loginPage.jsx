import React, { useState } from "react";

export default function LoginPage({setLoggedIn}) {
  const [userName, setuserName] = useState("");
  const [authKey, setauthKey] = useState("");

    const tryLogin = () =>{
        if(null!=userName && userName && null!=authKey && authKey){
            console.info("Loged in");
            setLoggedIn(true);
        }
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col box-content h-4/6 w-5/12 bg-cyan-600 rounded-tl-xl rounded-tr-xl border-4 border-cyan-300">
        <div className="self-center font-extrabold font-serif text-7xl pt-6 text-amber-500">
          Login Page
        </div>
        <div className="flex flex-row justify-evenly mt-14">
          <label className="text-3xl">UserName:</label>
          <input
            type="text"
            placeholder="UserName"
            className="w-1/2 -translate-x-2 rounded-tl-lg rounded-br-lg"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-row justify-evenly mt-14">
          <label className="text-3xl">AuthCode:</label>
          <input
            type="text"
            placeholder="Authentication Code"
            className="w-1/2 -translate-x-2 rounded-tl-lg rounded-br-lg"
            value={authKey}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setauthKey(e.target.value);
              }
            }}
          ></input>
        </div>
        <button className="mt-14 text-2xl mx-12 py-1 border-red-300 border-2 bg-red-700 text-indigo-50 font-semibold"
            onClick={tryLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
