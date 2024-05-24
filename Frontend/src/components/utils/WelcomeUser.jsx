import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const WelcomeUser = () => {
    const {user} = useAuth0();
  return <div className="text-[#56555C]">
    <h1>
        Welcome Back! {user?.name}
    </h1>
  </div>;
};

export default WelcomeUser;
