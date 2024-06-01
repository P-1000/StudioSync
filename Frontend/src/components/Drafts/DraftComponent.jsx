import React, { useState } from "react";
import { motion } from "framer-motion";
import TempUpload from "../trackDetails/Temp";
import MetadataDraft from "./MetadataDraft";

const DraftComponent = ({ onDraftTypeChange }) => {
  const [selectedType, setSelectedType] = useState("video");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onDraftTypeChange(type); // Notify parent component of the selected draft type
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen flex-col justify-center items-center w-full bg-gray-100"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 py-4">
        Choose Draft Type
      </h1>
      <div className="flex gap-4">
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

export default DraftComponent;
