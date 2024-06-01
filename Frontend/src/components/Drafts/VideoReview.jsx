import React from "react";
import { FaRegUser, FaRegClock, FaVideo } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const VideoReview = ({ draft }) => {
  const navigate = useNavigate();
  localStorage.setItem("draft", JSON.stringify(draft));
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex gap-4 justify-around items-center">
          <div className="mb-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
              <MdDescription className="mr-2 text-blue-600" />
              {draft.description}
            </h3>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
              <GrStatusGood className="mr-2 text-green-600" />
              {draft.status}
            </h3>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700 flex items-center">
              <FaRegUser className="mr-2 text-purple-600" />
              {draft.editor_username}
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <video
            className="w-full rounded-lg shadow-lg"
            autoPlay={false}
            loop={true}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                e.target.pause();
              }
            }}
            controls
          >
            <source
              src={
                `https://studisyncawsbucket.s3.amazonaws.com/` + draft.video_url
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate(`/draft/${draft.id}/review`)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          Go to Review Page
        </button>
      </div>
    </div>
  );
};

export default VideoReview;
