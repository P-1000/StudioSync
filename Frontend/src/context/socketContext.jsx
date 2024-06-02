import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };


//todo : add toast for the connection and error