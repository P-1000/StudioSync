import React, { useState, useEffect } from "react";
import { RandomAvatar } from "react-random-avatars";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const ProjectCards = () => {
  const { user, isLoading } = useAuth0();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getAllTracks(user?.sub);
    }
  }, [user]);

  const getAllTracks = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/tracks/get?id=${id}`
      );
      setTracks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render track cards when tracks are available
  return (
    <div className="flex flex-wrap gap-5 py-2 mt-2">
      {tracks.map((track) => (
        <Link key={track.id} to={`/tracks/${track.id}`}>
          <div className="bg-white border rounded-lg p-2 cursor-pointer">
            <div className="w-72 h-36">
              <img
                src="/Rectangle28.png"
                alt="Track Thumbnail"
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-1 p-2 mt-1">
              <div>
                <RandomAvatar name="youtube" size={30} />
              </div>
              <div className="flex justify-between gap-1 w-full">
                <h1>{track.name}</h1>
                <div className="cursor-pointer">
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>
            <div className="p-2 flex gap-2 flex-wrap">
              <h1 className="bg-gray-200 rounded-full px-2 py-[1px]">
                {new Date(track.updated_at).toLocaleString()}
              </h1>
              <h1 className="bg-[#5577ff54] rounded-full px-2 py-[1px]">
                {track.status}
              </h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectCards;
