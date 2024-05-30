import React from "react";
import WelcomeUser from "../utils/WelcomeUser";
import ProjectCards from "./ProjectCards";

const CreatorTracksComponent = ({ setShow, tracks }) => {
  return (
    <div className="flex flex-col gap-5 px-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center w-full mb-4">
        <WelcomeUser />
        <button
          onClick={() => setShow(true)}
          className="
            flex items-center gap-2 bg-blue-500 hover:bg-blue-600 
            text-white px-4 py-2 rounded-md shadow-md transition duration-200"
        >
          <span className="text-lg">+</span>
          <span>Add Track</span>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-gray-800 text-3xl font-semibold">Your Tracks</h1>
        <div>
          <ProjectCards tracks={tracks} />
        </div>
      </div>
    </div>
  );
};

export default CreatorTracksComponent;
