import React, { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./socketContext";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(0);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("new-notification", (notification) => {
        console.log("new message:", notification);
        setNotification((prev) => prev + 1);
        console.log("new message:", notification);
      });
    }
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
