import React from "react";
import { FaTrashAlt, FaFileExport, FaUserFriends } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import {motion} from "framer-motion";

const Modal = ({}) => {
  const items = [
    {
      name: "Delete",
      icon: <FaTrashAlt className="text-red-600" />,
    },
    {
      name: "Export",
      icon: <FaFileExport className="text-blue-600" />,
    },
    {
      name: "Archive",
      icon: <FaBoxArchive className="text-yellow-600" />,
    },
    {
      name: "Members",
      icon: <FaUserFriends className="text-green-600" />,
    },
  ];
  return (
    <motion.div 
        initial={{opacity: 0, y: -40 , }}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4  , type: "spring", stiffness: 50}}
    className="bg-white shadow-2xl border-2 border-gray-300 rounded-xl absolute p-4 w-56">
      <motion.div 
        initial={{opacity: 0, y: -10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5 , delay: 0.2 , type: "spring", stiffness: 120}}
      className="flex flex-col gap-2 w-full">
        {items.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <span className="text-2xl">{item.icon}</span>
            <h1 className="text-lg font-semibold">{item.name}</h1>
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
