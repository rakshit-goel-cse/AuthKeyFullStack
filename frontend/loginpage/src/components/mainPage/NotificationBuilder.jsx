import React, { useEffect, useState } from "react";
import Notification from "./Notification";

export default function NotificationBuilder({
  NotificationList,
  setNotificationList,
}) {
  const removeNotification = (id) => {
    setNotificationList((prev) => {
      //console.warn(prev)
      return prev.filter((value) => value.id !== id);
    });
  };

  return (
    <div id="NotBuild" className="fixed end-6 w-1/6 h-screen my-14">
      {NotificationList.map((value, index) => {
        return (
          <Notification
            key={value.id}
            {...value}
            removeNoti={removeNotification}
          />
        );
      })}
    </div>
  );
}
