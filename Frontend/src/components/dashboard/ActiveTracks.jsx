import React from "react";
import { FaPercentage } from "react-icons/fa";

const ActiveTracks = () => {
  const tracks = [
    {
      title: "Track 1",
      logo: "https://source.unsplash.com/random",
      nextDeadline: "2 days",
      completion: 50,
      people: [
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "Jane Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
      ],
    },
    {
      title: "Track 2",
      logo: "https://source.unsplash.com/random",
      nextDeadline: "2 days",
      completion: 50,
      people: [
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "Jane Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
      ],
    },
    {
      title: "Track 3",
      logo: "https://source.unsplash.com/random",
      nextDeadline: "2 days",
      completion: 50,
      people: [
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "Jane Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
      ],
    },
    {
      title: "Track 4",
      logo: "https://source.unsplash.com/random",
      nextDeadline: "2 days",
      completion: 50,
      people: [
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "Jane Doe",
          image: "https://source.unsplash.com/random",
        },
        {
          name: "John Doe",
          image: "https://source.unsplash.com/random",
        },
      ],
    },
  ];
  return (
    <div className="">
      <div className="border rounded-xl bg-gray-100/10">
        <h1 className="text-xl border-b px-6 py-4 font-semibold text-gray-800">
          Active Tracks
        </h1>
        <div>
          {tracks.map((track, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 cursor-pointer border-b transition-all bg-white shadow-lg rounded-lg mb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={track.logo}
                  alt="track"
                  className="w-12 h-12 rounded-xl"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {track.title}
                  </h1>
                  <h2 className="text-sm font-semibold bg-gray-200 px-2 py-1 rounded-xl text-gray-800 mt-1">
                    Next Deadline: {track.nextDeadline}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
                    <FaPercentage />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-800">
                    {track.completion}%
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {track.people.map((person, index) => (
                  <img
                    key={index}
                    src={person.image}
                    alt="person"
                    className="w-8 h-8 rounded-full"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveTracks;
