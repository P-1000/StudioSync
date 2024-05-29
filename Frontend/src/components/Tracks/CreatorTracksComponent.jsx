import React from "react";
import WelcomeUser from "../utils/WelcomeUser";

const CreatorTracksComponent = () => {
  return (
    <div className="flex flex-col gap-5">
      <WelcomeUser />
      <div className="flex flex-col gap-5">
        <h1 className="text-[#56555C] text-3xl">Your Tracks</h1>
      </div>
    </div>
  );
};

export default CreatorTracksComponent;
