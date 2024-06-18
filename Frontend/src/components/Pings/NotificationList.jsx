import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ groupedPings, lastPingElementRef }) => {
  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedPings).map(([date, pings]) => (
        <div key={date} className="ping-thread">
          <h2 className="text-lg font-semibold mb-2">{formatDate(date)}</h2>
          <ul className="space-y-4">
            {pings.map((ping, index) => (
              <NotificationItem
                key={ping?.id || index}
                ping={ping}
                ref={index === pings.length - 1 ? lastPingElementRef : null}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
