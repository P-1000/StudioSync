import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/userContext";
import { useLocation } from "react-router-dom";
import CreatorDraftComponent from "../../Drafts/CreatorDraftComponent";

const CreatorDraft = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [drafts, setDrafts] = useState([]);
  const { token, isLoader } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchDrafts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/drafts/getvideodrafts/${id}`,
        config
      );
      console.log(await res.data.videodrafts);
      setDrafts(res.data.videodrafts);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);
  return (
    <div>
      <CreatorDraftComponent drafts={drafts} />
    </div>
  );
};

export default CreatorDraft;
