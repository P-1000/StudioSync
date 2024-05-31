import React, { useState } from "react";

const TimelineEditor = ({ annotations, playerRef, handleAnnotationClick }) => {
  const [hoveredAnnotation, setHoveredAnnotation] = useState(null);

  const renderAnnotations = () => {
    return annotations.map((annotation) => {
      const leftPosition = `${
        (annotation.time / playerRef.current.getState().player.duration) * 100
      }%`;

      return (
        <div
          key={annotation.id || annotation._id}
          className="absolute top-0 h-4 bg-red-600 rounded-full cursor-pointer"
          style={{ left: leftPosition }}
          onMouseEnter={() => setHoveredAnnotation(annotation)}
          onMouseLeave={() => setHoveredAnnotation(null)}
          onClick={() => handleAnnotationClick(annotation)}
        ></div>
      );
    });
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto flex items-center justify-start h-20 bg-gray-900">
        {renderAnnotations()}
      </div>
      {hoveredAnnotation && (
        <div className="absolute top-0 left-0 mt-2 ml-2 p-2 bg-gray-800 text-white rounded-md">
          {hoveredAnnotation.text}
        </div>
      )}
    </div>
  );
};

export default TimelineEditor;
