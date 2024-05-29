import React, { useState, useContext } from "react";
import CreatorTracksComponent from "../../../components/Tracks/CreatorTracksComponent";
import { AuthContext } from "../../../context/userContext";

const CreatorTracksPage = () => {
  const { authUser, isLoading } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [show, setShow] = useState(false);

  return (
    <div className="w-full items-center">
      <CreatorTracksComponent setShow={setShow} />
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative p-10 bg-white shadow-xl border rounded-lg w-96">
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h1 className="text-2xl text-center mb-4">Add new Track</h1>
            <div>
              <input
                type="text"
                placeholder="Track Name"
                className="w-full p-2 mb-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Track Description"
                className="w-full p-2 mb-2 border-2 border-gray-300 rounded-md"
              />
              <button
                className="
                  w-full bg-blue-500 hover:bg-blue-600 text-white 
                  px-4 py-2 rounded-md shadow-md transition duration-200"
              >
                Add Track
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorTracksPage;
