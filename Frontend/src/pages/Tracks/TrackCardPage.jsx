import React, { useContext , useState , useEffect } from "react";
import { AuthContext } from "../../context/userContext";
import EditorTrack from "./EditorTrack";
import CreatorTrack from "./CreatorTrack";

const TrackCardPage = () => {
  const { authUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <div>Please log in to view this page.</div>;
  }

  

  return (
    <div>
      {authUser.role === "creator" ? <CreatorTrack /> : <EditorTrack />}
    </div>
  );
};

export default TrackCardPage;
