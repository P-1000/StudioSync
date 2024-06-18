import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaFolderMinus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const BreadCrumsb = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { name } = props;
  const { id } = useParams();
  return (
    <div className="capitalize flex justify-between w-full px-4 items-center">
      <div>
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-green-700 rounded-sm" />
          <div>
            <h1 className="text-xl">{name}</h1>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <img src="/taskflowl.png" alt="taskflow" className="w-5 h-5 ml-2" />
          </div>
          <div className="flex gap-2 items-center px-2 mt-3">
            <div>
              <FaFolderMinus />
            </div>
            <Link to="/tracks">
              <h1>Tracks</h1>
            </Link>
            <div>
              <img
                src="/taskflows.png"
                alt="taskflow"
                className="w-5 h-[6px]"
              />
            </div>
            <Link to={`/tracks/${id}`}>
              <h1>{id}</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <MdModeEdit className=" text-gray-800 p-2 border rounded-lg text-4xl hover:bg-black transition-all hover:text-white cursor-pointer" />
        <div>
          <button onClick={() => setShowModal(!showModal)}>
            <BsThreeDots className=" text-gray-800 border p-2 rounded-lg text-4xl hover:bg-black transition-all hover:text-white cursor-pointer" />
          </button>
          <div className="absolute top-12 right-64 py-8">
            {showModal && <Modal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumsb;
