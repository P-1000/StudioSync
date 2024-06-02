import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/userContext";

const AcceptInvitation = () => {
  const { token, isLoading } = useContext(AuthContext);
  const { invitationId } = useParams();
  const history = useNavigate();

  const acceptInvitation = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "/api/invitations/accept",
        {
          invitation_id: invitationId,
        },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && token !== null) {
      acceptInvitation();
    }
  }, [isLoading, token, invitationId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!token) {
        history("/login");
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [token, history]);

  return (
    <div>
      <h1>Accepting Invitation...</h1>
      {isLoading && (
        <p>
          Please wait while we verify your credentials...
        </p>
      )}
    </div>
  );
};

export default AcceptInvitation;
