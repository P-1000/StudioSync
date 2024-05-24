import React from "react";
import EditorMetrics from "./EditorMetrics";
import ActiveTracks from "./ActiveTracks";

const Editorpage = () => {
  return (
    <div className="px-10 ">
      <EditorMetrics />
      <div className="grid grid-cols-2">
        {/* <ActiveTracks /> */}
      </div>
    </div>
  );
};

export default Editorpage;
