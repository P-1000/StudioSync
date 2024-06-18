import React from "react";

const Action = ({ handleSendFeedback, handleApprove }) => {
  return (
    <div>
      <button
        onClick={handleSendFeedback}
        className="px-3 py-1 border-2 rounded-lg hover:bg-white hover:text-black"
      >
        Send Feedback
      </button>
      <button
        onClick={handleApprove}
        className="px-3 py-1 border-2 rounded-lg hover:bg-white hover:text-black"
      >
        Approve
      </button>
    </div>
  );
};

export default Action;
