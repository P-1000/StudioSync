import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="w-full flex gap-2">
      <input type="text" placeholder="Search for a track" className="px-10 w-full border outline-none rounded-lg" />
      <CiSearch className="border rounded-lg w-10 h-8" />
    </div>
  );
};

export default Search;
