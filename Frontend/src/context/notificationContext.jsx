import React, { createContext, useState, useEffect, useContext } from "react";
import { SocketContext } from "./socketContext";
import { Toaster, toast } from "sonner";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("new-notification", (notification) => {
        setNotifications([...notifications, notification]);
      });
    }
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {/* <Toaster position="top-right" /> */}
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
