import React from "react";
import axios from "axios";

const UploadDraft = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const res = await axios.get("http://localhost:3000/getuploadurl");
    const url = res.data.url;
    console.log(url);
    const post = await axios.put(url, file);
    console.log(post);
  };
  return (
    <div>
      <label className="relative cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ">
        <span>send a new bankai</span>
        <input
          type="file"
          className="opacity-0 absolute inset-0 w-full h-full z-10"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default UploadDraft;
