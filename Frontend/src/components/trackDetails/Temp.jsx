import React, { useState, useContext } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/userContext";
import { useLocation } from "react-router-dom";

const TempUpload = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const track_id = location.pathname.split("/")[2];
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    } else {
      alert("Please select a file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("No file selected.");
      return;
    }

    if (!title || !description) {
      alert("Please enter title and description.");
      return;
    }

    setUploading(true);

    try {
      const urlResponse = await axios.get(
        "http://localhost:3000/api/drafts/getuploadurl"
      );
      const uploadUrl = urlResponse.data.url;
      const filename = urlResponse.data.filename;
      const formData = new FormData();
      formData.append("file", selectedFile);
      await axios.put(uploadUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:3000/api/drafts/storevideodraft",
        {
          track_id: track_id,
          video_url: filename,
          title: title,
          description: description,
          status: "pending",
        },
        config
      );

      setSelectedFile(null);
      setTitle("");
      setDescription("");
      setUploading(false);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6 border border-gray-300 rounded-lg">
      <div className="mt-4">
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
            <input
              type="text"
              placeholder="Enter title"
              className="mt-2 border border-gray-400 rounded-md p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Enter description"
              className="mt-2 border border-gray-400 rounded-md p-2 w-full h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              onClick={handleUploadClick}
              className={`mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempUpload;
