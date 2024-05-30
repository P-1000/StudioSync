import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MembershipManagement = () => {
  const location = useLocation();
  const trackid_ = location.pathname.split("/")[2];
  const id = parseInt(trackid_);

  const [email, setEmail] = useState("");
  const [members, setMembers] = useState();
  const [emailStatus, setEmailStatus] = useState({ valid: true, exists: true });
  const navigate = useNavigate();
  const { token, authUser } = useContext(AuthContext);

  //update the url when the modal is opened or closed
  const udpateParams = (params) => {
    if (params) {
      const query = new URLSearchParams();
      query.append("tab", "usermanagement");
      navigate({
        search: query.toString(),
      });
    } else {
      const query = new URLSearchParams();
      query.delete("tab");
      navigate({
        search: query.toString(),
      });
    }
  };
  const validateEmail = async (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailStatus({ valid: false, exists: true });
      return null;
    }

    setEmailStatus({ valid: true, exists: true });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(
        `/api/invitations/findemail?email=${email}`,
        config
      );
      if (data) {
        setEmailStatus({ valid: true, exists: true });
        return data;
      } else {
        setEmailStatus({ valid: true, exists: false });
        return null;
      }
    } catch (error) {
      setEmailStatus({ valid: true, exists: false });
      console.log(error);
      return null;
    }
  };

  const sendInvite = async (email, editor_id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        "/api/invitations/createnew",
        {
          track_id: id,
          editor_email: email,
          editor_id: editor_id,
        },
        config
      );
      setMembers([...members, { id: editor_id, name: email }]);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = async (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (emailInput) {
      const userData = await validateEmail(emailInput);
      if (userData) {
        setEmailStatus({ valid: true, exists: true });
      }
    }
  };

  const handleSendInvite = async () => {
    if (email) {
      const userData = await validateEmail(email);
      if (userData) {
        await sendInvite(email, userData.id);
      }
    }
  };

  const getMembers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/tracks/getmembers/${id}`, config);
    setMembers(response.data.members);
  };

  useEffect(() => {
    udpateParams(true);
    getMembers();
    return () => {
      udpateParams(false);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl h-full p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Members</h1>
        <div className="space-y-4">
          {members &&
            members.map((member) => (
              <div
                key={member.member_id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {member.member_username}
                  </h2>
                  <h3 className="text-sm">{member.member_email}</h3>
                </div>

                {authUser.role === "creator" ? (
                  <button className="text-red-600 font-semibold hover:underline">
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Add Members</h1>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 
              ${!emailStatus.valid ? "border-red-600" : ""}
              ${!emailStatus.exists ? "border-yellow-600" : ""}`}
          />
          <button
            onClick={handleSendInvite}
            disabled={!emailStatus.valid || !emailStatus.exists || !email}
            className={`px-4 py-2 rounded-lg w-48 transition duration-300
              ${
                !emailStatus.valid || !emailStatus.exists || !email
                  ? "bg-gray-400"
                  : "bg-gray-800 text-white hover:bg-blue-700"
              }`}
          >
            Send Invite
          </button>
        </div>
        {!emailStatus.valid && (
          <p className="text-red-600 mt-2">Invalid email format.</p>
        )}
        {!emailStatus.exists && (
          <p className="text-yellow-600 mt-2">Email not found.</p>
        )}
      </div>
    </div>
  );
};

export default MembershipManagement;
