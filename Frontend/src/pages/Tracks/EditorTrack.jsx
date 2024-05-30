import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumsb from "../../components/trackDetails/BreadCrumsb";
import Hero from "../../components/trackDetails/Hero";
import TempUpload from "../../components/trackDetails/Temp";
import TrackMenuItems from "../../components/trackDetails/TrackMenuItems";
import { AuthContext } from "../../context/userContext";
import axios from "axios";

const EditorTrack = () => {
  const { id } = useParams();
  const { authUser, token } = useContext(AuthContext);
  const [track, setTrack] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getTrack = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/tracks/gettrack/${id}`,
      config
    );
    setTrack(await res.data.track);
  };
  useEffect(() => {
    getTrack();
    console.log(track);
  }, []);
  return (
    <div className=" w-full flex flex-col">
      <div className="border-b-2 p-5">
        <BreadCrumsb id={id} name={track.name} />
        <Hero track={track} />
      </div>
      <div className="">
        {/* <TempUpload/> */}
        <TrackMenuItems />
      </div>
    </div>
  );
};
export default EditorTrack;
