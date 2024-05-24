import React, { useState } from "react";
import axios from "axios";

const DemoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a video file.");
    }
  };

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
      setUploadUrl(url);
    } catch (error) {
      console.error("Error fetching upload URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg">
      <input
        type="file"
        id="file-upload"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Select Video
      </label>
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
