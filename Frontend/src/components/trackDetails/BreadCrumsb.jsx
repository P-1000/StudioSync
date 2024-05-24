import React from "react";
import { useParams } from "react-router-dom";
import { FaFolderMinus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const BreadCrumsb = () => {
  const { id } = useParams();
  return (
    <div className="capitalize flex justify-between w-full px-4 items-start">
      <div>
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-green-700 rounded-sm" />
          <div>
            <h1 className="text-xl">{id}</h1>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src="/taskflowl.png" alt="taskflow" className="w-5 h-5 ml-2" />
          </div>
          <div className="flex gap-2 items-center px-2 mt-3">
            <div>
              <FaFolderMinus />
            </div>
            <h1>Tracks</h1>
            <div>
              <img
                src="/taskflows.png"
                alt="taskflow"
                className="w-5 h-[6px]"
              />
            </div>
            <h1>{id}</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <FaEdit className="w-5 h-5 text-gray-500" />
        <BsThreeDots className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default BreadCrumsb;
