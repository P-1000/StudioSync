import React from "react";
import { LuFolderClock } from "react-icons/lu";
import ProjectCards from "./ProjectCards";

const LatestProjects = () => {
  return (
    <div className="text-slate-500">
      <div className="flex gap-1 items-center font-light">
        <div>
          <LuFolderClock className="text-xl" />
        </div>
        <div>
          <h1>Latest Tracks</h1>
        </div>
        {/* 
        //todo add search bar here if needed bro!
    */}
      </div>
      <div>
        <ProjectCards/>
      </div>
    </div>
  );
};

export default LatestProjects;
