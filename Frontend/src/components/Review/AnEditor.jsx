import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange, onFocus, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus1 = () => {
    console.log("onFocus");
    setIsFocused(true);
    onFocus();
  };
  const onChange1 = (value) => {
    setIsFocused(true);
    console.log("onChange");
    onChange();
  };

  const onBlur1 = () => {
    setIsFocused(false);
    console.log("onBlur");
    onBlur();
  }

  useEffect(() => {
    if (isFocused) {
      onFocus();
    } else {
      onBlur();
    }
  }, [isFocused]);

  return (
    <ReactQuill
      className="mb-4"
      theme="snow"
      value={value}
      onChange={onChange1}
      onFocus={onFocus1}
      onBlur={onBlur1}
      placeholder="Add your annotation here..."
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
    />
  );
};

export default Editor;
