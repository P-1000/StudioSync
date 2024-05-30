import React from "react";
import { LuFolderClock } from "react-icons/lu";
import EditorProjectCards from "./EditorProjectCards";

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
      <EditorProjectCards/>
      </div>
    </div>
  );
};

export default LatestProjects;
