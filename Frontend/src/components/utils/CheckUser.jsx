import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NewState } from "use-context-provider";
const CheckUser = () => {
  const [role, updateRole] = NewState("role", "editor");

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const checkindb = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const res = axios.post(
      "http://localhost:3000/api/auth/checkdb",
      {},
      config
    );
    console.log(await res);
    updateRole((await res).data.user.role);
    if ((await res).status == 200) {
      navigate("/dashboard");
    }
  };
  useEffect(() => {
    checkindb();
  }, []);
  return (
    <div>
      <div>
        <p>Please wait we are redirecting to your dashboard</p>
      </div>
    </div>
  );
};

export default CheckUser;
