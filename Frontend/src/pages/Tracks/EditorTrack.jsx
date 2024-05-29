import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BreadCrumsb from "../../components/trackDetails/BreadCrumsb";
import Hero from "../../components/trackDetails/Hero";
import TempUpload from "../../components/trackDetails/Temp";
import TrackMenuItems from "../../components/trackDetails/TrackMenuItems";
import { AuthContext } from "../../context/userContext";

const EditorTrack = () => {
  const { id } = useParams();
  const { authUser } = useContext(AuthContext);
  const isCreator = authUser.role === "creator";
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

export default EditorTrack;
