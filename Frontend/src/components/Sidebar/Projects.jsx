import React from "react";
import { BiPlus } from "react-icons/bi";
import { RandomAvatar } from "react-random-avatars";

const Projects = () => {
  return (
    <div className="border-t-2 w-full ">
      <div className="mt-3">
        <div className="flex justify-between">
          <h1>Projects</h1>
          <div className="bg-[#5577ffc0] h-5 flex w-5 items-center rounded-md cursor-pointer">
            <BiPlus className="mx-1  text-black font-bold" />
          </div>
        </div>
        <div className="py-2">
          <ul className="flex flex-col gap-4 py-3 text-slate-600">
            <li className="flex items-center gap-3  ">
              <RandomAvatar name="youtube" size={30} />
              <div className="text-base">
                <h1>Bankai</h1>
              </div>
            </li>
            <li className="flex items-center gap-3  ">
              <RandomAvatar name="macbook" size={30} />
              <span className="text-base">Youtube</span>
            </li>
            <li className="flex items-center gap-3  ">
              <RandomAvatar name="apple" size={30} />
              <span className="text-base">LinkedIn </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
