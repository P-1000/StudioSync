import React from "react";
import Tracks from "./Tracks";
import Search from "./Search";
import WelcomeUser from "../utils/WelcomeUser";
import LatestProjects from "./LatestProjects";

const TrackComponenet = () => {
  return (
    <div className="flex flex-col gap-5">
    <WelcomeUser/>
      {/* <Search /> */}
      <LatestProjects/>
      {/* <Tracks /> */}
    </div>
  );
};

export default TrackComponenet;
