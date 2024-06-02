import React, { useState, useEffect, useContext } from "react";
import { RandomAvatar } from "react-random-avatars";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/userContext";

const EditorProjectCards = () => {
  const { authUser, isLoading, token } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      getAllTracks(authUser.id);
    }
  }, [authUser]);

  const getAllTracks = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tracks/geteditortracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(res.data.track);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      // year: 'numeric',
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


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
                {formatDate(track.updated_at)}
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

export default EditorProjectCards;
