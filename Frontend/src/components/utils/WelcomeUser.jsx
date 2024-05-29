import React, { useContext } from "react";
import { AuthContext } from "../../context/userContext";

const WelcomeUser = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="text-[#56555C] flex gap-2 justify-between w-full">
      <h1>Welcome Back! {authUser?.username}</h1>
      {authUser?.role == "creator" ? (
        <div>
          <button
            className="
          flex gap-2 flex-row-reverse bg-blue-400 px-4 
          py-1 rounded-md items-center text-white"
          >
            <span>+</span>
            <span>Add Track</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default WelcomeUser;
