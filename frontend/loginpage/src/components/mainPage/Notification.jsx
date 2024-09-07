import React, { useEffect, useState } from "react";

export default function Notification({ id, type, msg, removeNoti }) {
  const [width, setwidth] = useState(0);
  useEffect(() => {
    let interval = setInterval(
      () => {
        setwidth((prevWidth) => {
          if (prevWidth < 100) {
            return prevWidth + 0.5;
          } else {
            removeNoti(id);
            clearInterval(interval);
            return prevWidth;
          }
        });
      },
      type === "error"? 1*5 :type === "msg" ? 6 * 5 : 2 * 5    //interval time
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id={"Noti" + id}
      key={"Noti" + id}
      className={`relative w-full z-10 border-stone-950 border-2 max-h-14 pl-1 overflow-auto mt-4 rounded-xl ${type === "error"?"bg-red-500":""} `}
      style={{ scrollbarWidth: "none"}}
    >
      {type === "error"?"Error While Sending Msg":type === "msg" ? msg : "Ping"}
      <div
        id={"bar" + id}
        key={"bar" + id}
        className={`sticky bottom-0 h-2 ${
          type === "msg" ? "bg-green-500" : "bg-red-600"
        } -ml-1`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
