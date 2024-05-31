import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Review from "./Review";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const ReviewContainer = () => {
  const location = useLocation();
  const track_id = location.pathname.split("/")[2];
  const draftFromStorage = localStorage.getItem("draft");
  const [draft, setDraft] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [annotationText, setAnnotationText] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    if (draftFromStorage) {
      setDraft(JSON.parse(draftFromStorage));
    }
  }, [draftFromStorage]);

  const handleAddAnnotation = async () => {
    const currentTime = playerRef.current.getState().player.currentTime;
    const newAnnotation = {
      id: uuidv4(),
      text: annotationText,
      time: currentTime,
    };
    setAnnotations([...annotations, newAnnotation]);
    const response = await axios.post(
      "http://localhost:3000/api/review/postannotation",
      {
        draft_id: draft.id,
        track_id,
        time_seconds: currentTime,
        text: annotationText,
      }
    );

    setAnnotationText("");
  };

  const handleEditorFocus = () => {
    if (!playerRef.current.getState().player.paused) {
      playerRef.current.pause();
    }
  };

  const handleEditorBlur = () => {
    if (!playerRef.current.getState().player.paused) {
      playerRef.current.play();
    }
  };

  const handleNavigateToAnnotation = (time) => {
    console.log("Seeking to time:", time);
    playerRef.current.seek(time);
  };

  return (
    <Review
      draft={draft}
      annotations={annotations}
      annotationText={annotationText}
      setAnnotationText={setAnnotationText}
      playerRef={playerRef}
      handleNavigateToAnnotation={handleNavigateToAnnotation}
      handleAddAnnotation={handleAddAnnotation}
      handleEditorFocus={handleEditorFocus}
      handleEditorBlur={handleEditorBlur}
    />
  );
};

export default ReviewContainer;
