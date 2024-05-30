import React, { useState, useContext, useEffect } from "react";
import CreatorTracksComponent from "../../../components/Tracks/CreatorTracksComponent";
import { AuthContext } from "../../../context/userContext";
import axios from "axios";

const CreatorTracksPage = () => {
  const { authUser, isLoading, token } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [show, setShow] = useState(false);
  const [newTrackData, setNewTrackData] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrackData({
      ...newTrackData,
      [name]: value,
    });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/api/tracks/addtrack",
        newTrackData,
        config
      );
      console.log("Track added successfully:", response.data);
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  const getTracks = async () => {
    try {
      const response = await axios.get("/api/tracks/get", config);
      setTracks(response.data.track);
      console.log("Tracks:", response.data.track)
    } catch (error) {
      console.error("Error getting tracks:", error);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className="w-full items-center">
      <CreatorTracksComponent tracks={tracks} setShow={setShow} />
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
                name="name"
                placeholder="Track Name"
                value={newTrackData.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="description"
                placeholder="Track Description"
                value={newTrackData.description}
                onChange={handleChange}
                className="w-full p-2 mb-2 border-2 border-gray-300 rounded-md"
              />
              <input
                type="datetime-local"
                name="deadline"
                value={newTrackData.deadline}
                onChange={handleChange}
                className="w-full p-2 mb-2 border-2 border-gray-300 rounded-md"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
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
