import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const DemoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert("Please select a video file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("No file selected.");
      return;
    }

    if (!uploadUrl) {
      alert("No upload URL available.");
      return;
    }

    try {
      console.log("Uploading file:", selectedFile.name);
      console.log("Upload URL:", uploadUrl);
      const response = await axios.put(uploadUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      console.log("File uploaded successfully:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchUploadUrl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getuploadurl");
      const url = response.data.url;
      console.log("Upload URL:", url);
      setUploadUrl(url);
    } catch (error) {
      console.error("Error fetching upload URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <label
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ${
            isDragActive && "bg-blue-400"
          }`}
        >
          {isDragActive ? "Drop the video here" : "Select or drop video"}
        </label>
      </div>
      {selectedFile && (
        <div className="mt-4">
          <p className="text-gray-700">{selectedFile.name}</p>
          <button
            onClick={handleUploadClick}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Upload Video
          </button>
        </div>
      )}
      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        onClick={fetchUploadUrl}
      >
        Get Upload URL
      </button>
    </div>
  );
};

export default DemoUpload;
