import React from "react";
import TrackComponenet from "../../components/Tracks/Track.Component";
import { GetStates } from "use-context-provider";

const TrackPage = () => {
  const {state} = GetStates();
  return (
    <div className=" bg-blue-200/10 p-5 h-full w-full overflow-x-hidden overflow-y-scroll">
      <TrackComponenet />
    </div>
  );
};

export default TrackPage;
