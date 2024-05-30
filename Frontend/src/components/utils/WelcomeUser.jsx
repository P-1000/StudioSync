import React, { useContext } from "react";
import { AuthContext } from "../../context/userContext";

const WelcomeUser = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="text-[#56555C] flex gap-2 justify-between w-full">
      <h1>Welcome Back! {authUser?.username}</h1>
      
    </div>
  );
};

export default WelcomeUser;
