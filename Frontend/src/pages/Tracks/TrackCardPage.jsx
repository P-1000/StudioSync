import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumsb from "../../components/trackDetails/BreadCrumsb";
import Hero from "../../components/trackDetails/Hero";
import TempUpload from "../../components/trackDetails/Temp";
import TrackMenuItems from "../../components/trackDetails/TrackMenuItems";

const TrackCardPage = () => {
  const { id } = useParams();
  return (
    <div className=" w-full flex flex-col">
      <div className="border-b-2 p-5">
        <BreadCrumsb />
        <Hero />
      </div>
      <div className="">
        {/* <TempUpload/> */}
        <TrackMenuItems />
      </div>
    </div>
  );
};

export default TrackCardPage;
