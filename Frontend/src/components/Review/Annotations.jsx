// Annotation.jsx
import React, { useState } from "react";
import Tooltip from "./Tooltip";

const Annotation = ({ annotation, playerRef }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playerRef.current.pause();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    playerRef.current.play();
  };

  const handleClick = () => {
    const time = annotation.time_seconds;
    playerRef.current.seek(time);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "absolute",
        left: `${
          (annotation.time_seconds / playerRef.current.getState().player.duration) * 100
        }%`,
        bottom: "50px", 
      }}
    >
      <div
        className="w-4 h-4 bg-red-600 rounded-full cursor-pointer"
        onClick={handleClick}
      />
      {isHovered && <Tooltip text={annotation.text} />}
    </div>
  );
};

export default Annotation;
