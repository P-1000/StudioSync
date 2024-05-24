import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileButton = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  useEffect(() => {
    if (user) {
      if (user.name.length > 10) {
        user.name = user.name.slice(0, 10);
      }
    }
  }, [user]);
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 border p-2 rounded-lg hover:shadow-lg transition-shadow duration-300">
        {isLoading ? (
          <div className="flex items-center gap-3 w-full animate-pulse">
            <div className="bg-gray-300 rounded-full h-12 w-12"></div>
            <div className="flex flex-col w-full">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <>
            <div>
              {isAuthenticated ? (
                <Avatar src={user.picture} size={50} round="4px" />
              ) : null}
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-base font-medium">
                {isAuthenticated ? user.name : "Login to Your Account"}
              </h1>
              <p className="text-slate-400 font-light text-sm">
                {isAuthenticated ? "Free Account" : ""}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
