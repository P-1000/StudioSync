import React, { useEffect, useState, useContext } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import { FaFolderTree } from "react-icons/fa6";
import { MdCrisisAlert } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../context/socketContext";
import { NotificationContext } from "../../context/notificationContext";
import { AuthContext } from "../../context/userContext";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";

const NavItems = () => {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Dashboard",
      icon: <BiSolidCategory />,
      link: "/dashboard",
    },
    {
      name: "Tracks",
      icon: <FaFolderMinus />,
      link: "/tracks",
    },
    {
      name: "Activities",
      icon: <MdMonitorHeart />,
      link: "/activities",
    },
    {
      name: "Assets",
      icon: <FaFolderTree />,
      link: "/assets",
    },
    {
      name: "Calendar",
      icon: <FaCalendarAlt />,
      link: "/calendar",
    },
    {
      name: "Pings",
      icon: <MdCrisisAlert />,
      link: "/pings",
      count: counter,
    },
  ];
  const { token, isLoading } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const { notification } = useContext(NotificationContext);
  const location = useLocation();
  const [active, setActive] = useState("/dashboard");

  useEffect(() => {
    if (!isLoading) {
      const not = fetchNotificationCount();
    }

    if (socket) {
      socket.on("new-notification", (notification) => {
        setCounter((prevCount) => prevCount + 1);
        toast(
          notification.message,
          {
            action: (
              <button
                className="bg-gray-900 text-white  py-1 w-28 rounded-lg hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => {
                  navigate("/pings");
                }}
              >
                View
              </button>
            ),
          },
          {
            duration: 50000,
          }
        );
      });
    }

    return () => {
      if (socket) {
        socket.off("new-notification");
      }
    };
  }, [socket, counter, isLoading]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await axios.get("/api/notifications/count", config);
      const count = await response.data.count;
      setCounter(count);
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div>
      <Toaster position="top-right" />
      <ul className="flex flex-col gap-4 w-full ">
        {navItems.map((item) => (
          <div key={item.name}>
            <Link to={item.link}>
              <li
                className={`${
                  active.startsWith(item.link)
                    ? "bg-[#5577FF] flex items-center gap-3 rounded-lg text-white  w-full p-2 px-4 transition-colors duration-500 ease-in-out"
                    : "hover:bg-blue-300/40 hover:shadow-md flex items-center gap-3 px-4 rounded-md w-full p-2 transition-all duration-200 ease-in-out"
                } `}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.link === "/pings" && counter > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {counter}
                  </span>
                )}
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
