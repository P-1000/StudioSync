import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import { FaFolderTree } from "react-icons/fa6";

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
  ];
  return (
    <div>
      <ul className="flex flex-col gap-4 py-3">
        {navItems.map((item, index) => (
          <li key={index} className="flex items-center gap-3  ">
            <a href={item.link}>{item.icon}</a>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
