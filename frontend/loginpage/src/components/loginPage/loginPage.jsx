import React, { useState } from "react";

export default function LoginPage({setLoggedIn}) {
  const [userName, setuserName] = useState("");
  const [authKey, setauthKey] = useState("");
  const [buttonPos, setbuttonPos] = useState(0);

    const tryLogin = () =>{
        if(null!=userName && userName && null!=authKey && authKey && authKey.length===6){
            console.info("Loged in");
            setLoggedIn(true);
        }
    }

    const updateMousePos = () => {
      if (userName && authKey && authKey.length === 6) {
        return; // If conditions are met, do nothing and return early
      }
      
      // Update buttonPos based on its current value
      if (buttonPos === 0) {
        setbuttonPos(1);
      } else if (buttonPos === 1) {
        setbuttonPos(2);
      } else if (buttonPos === 2) {
        setbuttonPos(1);
      }
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col box-content h-4/6 w-5/12 bg-cyan-600 rounded-tl-xl rounded-tr-xl border-4 border-cyan-300">
        <div className="self-center font-extrabold font-serif text-7xl pt-6 text-amber-500 select-none">
          Login Page
        </div>
        <div className="flex flex-row justify-evenly mt-14">
          <label className="text-3xl">UserName:</label>
          <input
            type="text"
            placeholder="UserName"
            className="w-1/2 -translate-x-2 rounded-tl-lg rounded-br-lg p-1 px-2"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-row justify-evenly mt-14">
          <label className="text-3xl">AuthCode:</label>
          <input
            type="text"
            placeholder="Authentication Code"
            className="w-1/2 -translate-x-2 rounded-tl-lg rounded-br-lg p-1 px-2"
            value={authKey}
            onChange={(e) => {
              if (!isNaN(e.target.value) && e.target.value.length<7) {
                setauthKey(e.target.value);
              }
            }}
          ></input>
        </div>
        {buttonPos===1 &&
        <div className="mt-14 text-2xl mx-12 py-1 font-semibold text-center select-none" >Please enter the complete details</div>
        }
        <button className={`${buttonPos===1?"mt-10":"mt-14"} text-2xl mx-12 py-1 border-red-300 border-2 bg-red-700 text-indigo-50 font-semibold `}
            onClick={tryLogin}
            onMouseOver={updateMousePos}
            >
          Login
        </button>
        {buttonPos===2 &&
        <div className="mt-10 text-2xl mx-12 py-1 font-semibold text-center select-none">Please enter the complete details</div>
        }
      </div>
    </div>
  );
}
