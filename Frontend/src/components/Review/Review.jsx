import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Player, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import Annotation from "./Annotations";
import Editor from "./AnEditor";
import { v4 as uuidv4 } from "uuid";

const Review = () => {
  const location = useLocation();
  const draftFromStorage = localStorage.getItem("draft");
  const [draft, setDraft] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotationText, setAnnotationText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (draftFromStorage) {
      setDraft(JSON.parse(draftFromStorage));
    }
  }, [draftFromStorage]);

  const handleAddAnnotation = () => {
    const currentTime = playerRef.current.getState().player.currentTime;
    const newAnnotation = {
      id: uuidv4(),
      text: annotationText,
      time: currentTime,
    };
    setAnnotations([...annotations, newAnnotation]);
    setAnnotationText("");
  };

  const handleEditorFocus = () => {
    setIsTyping(true);
    if (!playerRef.current.getState().player.paused) {
      playerRef.current.pause();
    }
  };

  const handleEditorBlur = () => {
    setIsTyping(false);
    if (!playerRef.current.getState().player.paused) {
      playerRef.current.play();
    }
  };

  const handleDeleteAnnotation = (id) => {
    setAnnotations(annotations.filter((annotation) => annotation.id !== id));
  };

  const handleNavigateToAnnotation = (time) => {
    playerRef.current.seek(time);
  };

  if (!draft) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 px-6 pt-6">
        Detailed Review
      </h1>
      <div className="flex-grow flex">
        <div className="w-full md:w-3/4">
          <div className="bg-black relative">
            <Player
              ref={playerRef}
              src={`https://studisyncawsbucket.s3.amazonaws.com/${draft.video_url}`}
            >
              <ControlBar autoHide={false} />
            </Player>
            {annotations.map((annotation) => (
              <Annotation
                key={annotation.id}
                annotation={annotation}
                playerRef={playerRef}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-6 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Add Annotation</h2>
          <Editor
            value={annotationText}
            onChange={setAnnotationText}
            onFocus={handleEditorFocus}
            onBlur={handleEditorBlur}
          />
          <button
            onClick={handleAddAnnotation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          >
            Add Annotation
          </button>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Annotations</h2>
            <ul className="space-y-2">
              {annotations.map((annotation) => (
                <li
                  key={annotation.id}
                  className="flex justify-between items-center bg-white p-2 rounded-lg"
                >
                  <span
                    onClick={() => handleNavigateToAnnotation(annotation.time)}
                    className="text-blue-600 cursor-pointer"
                  >
                    {annotation.text} - {Math.floor(annotation.time)}s
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
