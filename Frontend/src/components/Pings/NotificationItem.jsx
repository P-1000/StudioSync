import React from "react";
import PingIcon from "./PingIcon";

const NotificationItem = React.forwardRef(({ ping }, ref) => (
  <li
    ref={ref}
    className={`ping-item p-4 rounded shadow-md ${
      ping.status === "new" ? "bg-white" : "bg-gray-200"
    }`}
  >
    <div className="flex items-center">
      <div className="icon mr-4 text-xl">
        <PingIcon type={ping.type} />
      </div>
      <div>
        <p className="text-lg">{ping.message}</p>
        <span className="text-sm text-gray-500">
          {new Date(ping.created_at).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  </li>
));

export default NotificationItem;
