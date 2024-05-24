import React from "react";
import Avatar from "react-avatar";

const ProfileButton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 border p-2 rounded-lg">
        <div>
          <Avatar githubHandle="sitebase" size={50} round="4px" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="">Rengoku </h1>
          <p className="text-slate-400 font-light text-sm">Free Account</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileButton;
