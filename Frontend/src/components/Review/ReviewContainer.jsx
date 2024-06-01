// ReviewContainer.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import Review from "./Review";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { AuthContext } from "../../context/userContext";

const ReviewContainer = () => {
  const { token } = useContext(AuthContext);
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

  useEffect(() => {
    if (draft) {
      getAnnotations();
    }
  }, [draft]);

  const getAnnotations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/review/getannotations/${draft.id}`
      );
      setAnnotations(response.data);
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const handleAddAnnotation = async () => {
    const currentTime = playerRef.current.getState().player.currentTime;
    const newAnnotation = {
      id: uuidv4(),
      text: annotationText,
      time: currentTime,
    };
    setAnnotations([...annotations, newAnnotation]);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/review/postannotation",
        {
          draft_id: draft.id,
          track_id,
          time_seconds: currentTime,
          text: annotationText,
        }
      );
      console.log("Annotation posted successfully:", response.data);
      setAnnotationText("");
    } catch (error) {
      console.error("Error posting annotation:", error);
    }
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
    playerRef.current.seek(time);
  };

  const handleSendFeedback = async () => {
    try {
      console.log(draft.id)
      const response = await axios.post(
        "http://localhost:3000/api/review/sendvideoannotation",
        {
          draft_id: draft.id,
          track_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Feedback sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
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
      handleSendFeedback={handleSendFeedback}
    />
  );
};

export default ReviewContainer;
