import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumsb from "../../components/trackDetails/BreadCrumsb";
import Hero from "../../components/trackDetails/Hero";

const TrackCardPage = () => {
  const { id } = useParams();
  return (
    <div className=" w-full">
      <div className="border-b-2 p-5">
        <BreadCrumsb />
        <Hero />
      </div>
    </div>
  );
};

export default TrackCardPage;
