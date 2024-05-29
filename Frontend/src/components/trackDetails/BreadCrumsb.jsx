import React from "react";
import { useParams } from "react-router-dom";
import { FaFolderMinus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const BreadCrumsb = () => {
  const { id } = useParams();
  return (
    <div className="capitalize flex justify-between w-full px-4 items-center">
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
        <MdModeEdit className=" text-gray-800 p-2 border rounded-lg text-4xl hover:bg-black transition-all hover:text-white cursor-pointer" />
        <BsThreeDots className=" text-gray-800 border p-2 rounded-lg text-4xl hover:bg-black transition-all hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default BreadCrumsb;
