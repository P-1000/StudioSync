import React from "react";
import { FaChartLine } from "react-icons/fa";

const EditorMetrics = () => {
  const metrics = [
    {
      title: "Open Tracks",
      value: 0,
      icon: <FaChartLine />,
    },
    {
      title: "Over Due Tracks",
      value: 0,
      icon: <FaChartLine />,
    },
    {
      title: "Completed Tracks",
      value: 0,
      icon: <FaChartLine />,
    },
    {
      title: "Total Tracks",
      value: 0,
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 py-4 bg-gray-100/10 rounded-lg sm:grid-cols-2 md:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex justify-between place-content-center p-4 cursor-pointer hover:scale-105 transition-all bg-white shadow-lg rounded-lg"
        >
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {metric.title}
            </h1>
            <h2 className="text-2xl font-bold text-gray-900">{metric.value}</h2>
          </div>
          <div className="flex items-center justify-center w-12 h-12 text-white mt-1 bg-gray-500 rounded-lg">
            {metric.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditorMetrics;
