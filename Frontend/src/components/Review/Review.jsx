import React, { useState, useEffect, useContext } from "react";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import Annotation from "./Annotations";
import axios from "axios";
import TimelineEditor from "./TimelineEditor";
import { AuthContext } from "../../context/userContext";

const Review = ({
  draft,
  annotations,
  annotationText,
  setAnnotationText,
  playerRef,
  handleAddAnnotation,
  handleEditorFocus,
  handleEditorBlur,
  handleNavigateToAnnotation,
  handleSendFeedback,
}) => {
  if (!draft) {
    return <div>Loading...</div>;
  }

  const { authUser } = useContext(AuthContext);
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex gap-2 justify-between w-full px-10 py-5 items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-200 ">
          {authUser.role === "creator" ? "Annotation Mode" : "Video Feedback"}
        </h1>
        <button 
          onClick={handleSendFeedback}
        className="px-3 py-1 border-2 rounded-lg hover:bg-white hover:text-black">
          Send Feedback
        </button>
      </div>
      <div className="flex-grow flex">
        <div className="w-full md:w-3/4">
          <div className="bg-black relative">
            <Player
              ref={playerRef}
              src={`https://studisyncawsbucket.s3.amazonaws.com/${draft.video_url}`}
            >
              <ControlBar autoHide={false} />
            </Player>
            <TimelineEditor annotations={annotations} playerRef={playerRef} />
            {annotations.map((annotation) => (
              <Annotation
                key={annotation.id || annotation._id}
                annotation={annotation}
                playerRef={playerRef}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-6 bg-gray-800 overflow-y-auto">
          {authUser.role === "creator" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Add Annotation</h2>
              <textarea
                className="mb-4 p-2 w-full h-40 border border-gray-600 rounded-lg resize-none bg-gray-700 text-gray-200"
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                onFocus={handleEditorFocus}
                onBlur={handleEditorBlur}
                placeholder="Add your annotation here..."
              />
              <button
                onClick={handleAddAnnotation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full"
              >
                Add Annotation
              </button>
            </div>
          )}
          <div className="mt-8 h-56">
            <h2 className="text-2xl font-semibold mb-4">Annotations</h2>
            <ul className="space-y-2">
              {annotations.map((annotation) => (
                <li
                  key={annotation.id || annotation._id}
                  className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                >
                  <span
                    onClick={() =>
                      handleNavigateToAnnotation(
                        annotation?.time || annotation?.time_seconds
                      )
                    }
                    className="text-blue-400 cursor-pointer"
                  >
                    {annotation.text} -{" "}
                    {Math.floor(annotation.time || annotation.time_seconds)}s
                  </span>
                  <button
                    onClick={() => handleDeleteAnnotation(annotation.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
