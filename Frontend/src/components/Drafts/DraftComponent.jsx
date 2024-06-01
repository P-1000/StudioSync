import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import TempUpload from "../trackDetails/Temp";
import MetadataDraft from "./MetadataDraft";
import { useModal } from "../../context/modalContext"; // Adjust the import path as necessary
import VideoReview from "./VideoReview";
import axios from "axios";
import { AuthContext } from "../../context/userContext";
import { useLocation } from "react-router-dom";

const DraftComponent = ({ onDraftTypeChange }) => {
  const [selectedType, setSelectedType] = useState("video");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onDraftTypeChange(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center items-center w-full bg-gray-100 p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 py-4">
        Choose Draft Type
      </h1>
      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 text-lg font-medium rounded-lg focus:outline-none transition-colors duration-300 ${
            selectedType === "video"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTypeChange("video")}
        >
          Video Draft
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 text-lg font-medium rounded-lg focus:outline-none transition-colors duration-300 ${
            selectedType === "metadata"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTypeChange("metadata")}
        >
          Metadata Draft
        </motion.button>
      </div>
      {selectedType === "video" && <TempUpload />}
      {selectedType === "metadata" && <MetadataDraft />}
    </motion.div>
  );
};

const CreatorDraftComponent = () => {
  const [drafts, setDrafts] = useState([]);
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { openModal } = useModal();
  const getDrafts = async () => {
    try {
      const { data } = await axios.get(
        `/api/drafts/getvideodrafts/${id}`,
        config
      );
      setDrafts(data.videodrafts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);

  const handleReview = (draft) => {
    openModal(<VideoReview draft={draft} />, `Quick Review : ${draft.title}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Drafts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Editor Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Draft Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {drafts.length > 0 ? (
              drafts.map((draft) => (
                <tr key={draft.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(draft.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {draft.editor_username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {draft.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {draft.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {draft.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => handleReview(draft)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-700"
                >
                  No drafts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MainComponent = ({ drafts = [], onDraftTypeChange }) => {
  const [view, setView] = useState("drafts");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView("drafts")}
          className={`px-6 py-2 mx-2 text-lg font-medium rounded-lg focus:outline-none transition-colors duration-300 ${
            view === "drafts"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Drafts
        </button>
        <button
          onClick={() => setView("newDraft")}
          className={`px-6 py-2 mx-2 text-lg font-medium rounded-lg focus:outline-none transition-colors duration-300 ${
            view === "newDraft"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          New Draft
        </button>
      </div>
      {view === "drafts" ? (
        <CreatorDraftComponent drafts={drafts} />
      ) : (
        <DraftComponent onDraftTypeChange={onDraftTypeChange} />
      )}
    </div>
  );
};

export default MainComponent;
