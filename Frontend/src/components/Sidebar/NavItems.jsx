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
    },
  ];
  const location = useLocation();
  const [active, setActive] = useState("/dashboard");
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);
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
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
