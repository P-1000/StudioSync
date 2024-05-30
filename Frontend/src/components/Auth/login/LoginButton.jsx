import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()}>
      <div className="w-full">
        <div className="flex items-center gap-3 border p-2 rounded-lg ">
          <div className="flex flex-col w-full">
            <h1 className="">Login</h1>
            <p className="text-slate-400 font-light text-sm">
              Login to your account{" "}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default LoginButton;
