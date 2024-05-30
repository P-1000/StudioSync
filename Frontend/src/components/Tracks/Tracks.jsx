import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

const Tracks = () => {
  const tracks = [
    {
      title: "Some Track",
      id: 1,
      status: "building",
      totalTasks: 10,
      completedTasks: 5,
      cover: "https://source.unsplash.com/random/150x150",
      LastUpdated: "2021-10-10",
    },
    {
      title: "Some Track",
      id: 2,
      status: "building",
      totalTasks: 10,
      completedTasks: 5,
      cover: "https://source.unsplash.com/random/150x150",
      LastUpdated: "2021-10-10",
    },
    {
      title: "Some Track",
      id: 3,
      status: "building",
      totalTasks: 10,
      completedTasks: 5,
      cover: "https://source.unsplash.com/random/150x150",
      LastUpdated: "2021-10-10",
    },
    {
      title: "Some Track",
      status: "building",
      id: 4,
      totalTasks: 10,
      completedTasks: 5,
      cover: "https://source.unsplash.com/random/150x150",
      LastUpdated: "2021-10-10",
    },
    {
      title: "Some Track",
      status: "building",
      id: 5,
      totalTasks: 10,
      completedTasks: 5,
      cover: "https://source.unsplash.com/random/150x150",
      LastUpdated: "2021-10-10",
    },
  ];
  return (
    <div className="flex flex-wrap gap-10 p-10">
      {tracks.map((track, index) => (
        <div
          key={index}
          className="w-1/4 cursor-pointer bg-white shadow-lg rounded-lg p-5"
        >
          <Link to={`/tracks/${track.id}`}>
            <div className="flex justify-between gap-2 ">
              <div className="flex gap-2">
                <img
                  src={track.cover}
                  alt="cover"
                  className="w-12 h-12 mt-2 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold">{track.title}</h1>
                  <h1 className="bg-blue-500 rounded-full text-center w-fit px-3 py-[1px]">
                    {track.status}
                  </h1>
                </div>
              </div>
              <div>
                <CiMenuKebab className="text-2xl mt-2" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Tracks;
