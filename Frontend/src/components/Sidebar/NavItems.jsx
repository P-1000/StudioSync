import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import { FaFolderTree } from "react-icons/fa6";
import { MdCrisisAlert } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavItems = () => {
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
      // Add count state for notifications
      count: 0,
    },
  ];
  const location = useLocation();
  const [active, setActive] = useState("/dashboard");
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  // Function to update notification count
  const updateNotificationCount = () => {
    // Increase notification count by 1 for "Pings"
    const updatedNavItems = navItems.map((item) =>
      item.link === "/pings" ? { ...item, count: item.count + 1 } : item
    );
    // Update state with the updated navigation items
    setNavItems(updatedNavItems);
  };

  return (
    <div>
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
                {/* Display notification count if greater than 0 */}
                {item.link === "/pings" && item.count > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {item.count}
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
