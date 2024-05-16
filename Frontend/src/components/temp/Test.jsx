import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Push from "./Push";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div className="border p-10">
          <img src={user.picture} alt={user.name} />
          <h2 className="text-3xl ">{user.name}</h2>
          <p>{user.email}</p>
          <div>
            <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: "http://localhost:5173/login",
                  },
                })
              }
            >
                Logout
            </button>
          </div>
        </div>
              <Push />
      </div>
    )
  );
};

export default Profile;
