import React from "react";
import { useParams } from "react-router-dom";
import UploadDraft from "../../components/Tracks/UploadDraft";

const TrackCardPage = () => {
  const { id } = useParams();
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
    <div className="p-5">
      <div className="mb-5">
        <UploadDraft />
      </div>
      <div className="flex flex-wrap gap-4">
        {tracks.map((track) => {
          if (track.id == id) {
            return (
              <div
                key={track.id}
                className="w-full md:w-1/3 lg:w-1/4 cursor-pointer bg-white shadow-lg rounded-lg p-5"
              >
                <div className="flex justify-between gap-2">
                  <div className="flex gap-2">
                    <img
                      src={track.cover}
                      alt="cover"
                      className="w-16 h-16 rounded-lg"
                    />
                    <div>
                      <h1 className="font-bold">{track.title}</h1>
                      <p className="text-sm">{track.status}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">Last Updated: {track.LastUpdated}</p>
                  </div>
                </div>
                <div className="flex justify-between gap-2 mt-2">
                  <p className="text-sm">Total Tasks: {track.totalTasks}</p>
                  <p className="text-sm">
                    Completed Tasks: {track.completedTasks}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TrackCardPage;
