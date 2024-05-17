import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaTicketAlt, FaCog } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
const Sidebar = () => {
  // tickets 
  // chat 
  //current location 
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = React.useState(location.pathname);

  return (
    <aside className="flex   flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l  dark:border-gray-700">
      <a href="#" className="mx-auto">
        <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="" />
      </a>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">John Doe</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">john@example.com</p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link to='/'
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
            href="#"
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          <Link to = '/scs'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <FaUser className="w-5 h-5" />
            <span className="mx-4 font-medium">Accounts</span>
          </Link>

          <Link to = '/tracks'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <FaTicketAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Tracks</span>
          </Link>

          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            href="#"
          >
            <FaCog className="w-5 h-5" />
            <span className="mx-4 font-medium">Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
