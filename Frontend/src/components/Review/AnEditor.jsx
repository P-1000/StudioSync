import React from "react";

const AnEditor = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <textarea
      className="mb-4 p-2 w-full h-40 border border-gray-300 rounded-lg resize-none"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder="Add your annotation here..."
    />
  );
};

export default AnEditor;
