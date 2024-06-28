import React, { useEffect, useState } from "react";
import Temp from "../../Temp";

const Action = ({ handleSendFeedback, handleApproveDraft }) => {
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);
  const handleApprove = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (token) {
      handleApproveDraft(token);
    }
  }, [setToken , token]);
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
      {
        <Modal
          show={showModal}
          setToken={setToken}
          handleClose={() => {
            setShowModal(false);
            handleApproveDraft();
          }}
        />
      }
    </div>
  );
};

const Modal = ({ show, handleClose, setToken }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        show ? "" : "hidden"
      }`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
        <p>Are you sure you want to approve this draft?</p>
        <div>
          <Temp setToken={setToken} />
        </div>
        <button
          onClick={handleClose}
          className="px-3 py-1 border-2 rounded-lg hover:bg-white hover:text-black"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Action;
