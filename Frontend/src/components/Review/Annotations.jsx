import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Annotation = ({ annotation, playerRef }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${
          (annotation.time / playerRef.current.getState().player.duration) * 100
        }%`,
      }}
      data-tip={annotation.text}
    >
      <div className="w-4 h-4 mt-24 bg-red-600 rounded-full">
        <ReactTooltip
          place="bottom-end"
          content="Annotation"
          type="dark"
          effect="solid"
        />
      </div>
    </div>
  );
};

export default Annotation;
