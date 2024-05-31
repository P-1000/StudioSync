import React from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" p-4 bg-white rounded-lg absolute  shadow-lg w-[90vw] h-[90vh]  overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
