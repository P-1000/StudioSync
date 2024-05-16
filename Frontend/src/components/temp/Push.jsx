import React, { useState } from "react";
import axios from "axios";

const Push = () => {
  const [url, setUrl] = useState("");
  const push = async () => {
    const res = await axios.get("http://localhost:3000/authinit");
    const data = await res.data.url;
    console.log(data, "data");
    await setUrl(data);
    redirect();
  };

  let count = 0;

  const redirect = async () => {
    // if url is empty then wait for 1 second
    if (count == 4) {
      return;
    }
    if (url === "") {
      setTimeout(() => {
        redirect();
        return;
      }, 1000);
    }
    count++;
    window.open(url, "_blank");
  };
  return (
    <div className="flex justify-center p-10">
      <button
        onClick={push}
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Push
      </button>
    </div>
  );
};

export default Push;
