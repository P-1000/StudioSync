import React, { useContext } from "react";
import { AuthContext } from "../../context/userContext";
import CreatorTracksPage from "./trackPage/CreatorTracksPage";
import EditorTrackPages from "./trackPage/EditorTrackPages";

const TrackPage = () => {
  const { authUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser) {
    return <div>Please log in to view this page.</div>;
  }
  return (
    <div className=" bg-blue-200/10 p-5 h-full w-full overflow-x-hidden overflow-y-scroll">
      {authUser.role === "creator" ? (
        <CreatorTracksPage />
      ) : (
        <EditorTrackPages />
      )}
    </div>
  );
};

export default TrackPage;
