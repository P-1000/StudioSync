import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import {
  FaUserPlus,
  FaInfoCircle,
  FaCheckCircle,
  FaCommentDots,
  FaBell,
  FaExclamationCircle,
  FaEnvelope,
  FaAt,
  FaFileUpload,
  FaFlagCheckered,
  FaQuestionCircle,
  FaSyncAlt,
  FaCogs,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import { AuthContext } from "../../context/userContext";

const Pings = () => {
  const [pings, setPings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  const { token } = useContext(AuthContext);

  const fetchPings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/notifications", {
        params: { limit: 10, page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPings = response.data.notifications;
      setPings((prevPings) => [...prevPings, ...newPings]);
      setHasMore(newPings.length > 0);
      setLoading(false);
    } catch (err) {
      setError("Error fetching notifications");
      setLoading(false);
    }
  }, [page, token]);

  useEffect(() => {
    fetchPings();
  }, [page, fetchPings]);

  const lastPingElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString(undefined, options);
  };

  const getIcon = (type) => {
    switch (type) {
      case "invitation":
        return <FaUserPlus className="text-blue-500" />;
      case "update":
        return <FaInfoCircle className="text-yellow-500" />;
      case "task":
        return <FaCheckCircle className="text-green-500" />;
      case "comment":
        return <FaCommentDots className="text-purple-500" />;
      case "approval":
        return <FaCheckCircle className="text-green-500" />;
      case "reminder":
        return <FaBell className="text-red-500" />;
      case "deadline":
        return <FaExclamationCircle className="text-red-500" />;
      case "message":
        return <FaEnvelope className="text-blue-500" />;
      case "mention":
        return <FaAt className="text-yellow-500" />;
      case "file-upload":
        return <FaFileUpload className="text-blue-500" />;
      case "milestone":
        return <FaFlagCheckered className="text-green-500" />;
      case "feedback-request":
        return <FaQuestionCircle className="text-blue-500" />;
      case "revision-request":
        return <FaSyncAlt className="text-yellow-500" />;
      case "system-alert":
        return <FaCogs className="text-gray-500" />;
      case "team-join":
        return <FaUsers className="text-green-500" />;
      case "collaboration-request":
        return <FaHandshake className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  // Group notifications by date
  const groupedPings = pings.reduce((acc, ping) => {
    const dateKey = new Date(ping.created_at).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(ping);
    return acc;
  }, {});

  return (
    <div className="pings-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Pings</h1>
      <div className="space-y-6">
        {Object.entries(groupedPings).map(([date, pings]) => (
          <div key={date} className="ping-thread">
            <h2 className="text-lg font-semibold mb-2">{formatDate(date)}</h2>
            <ul className="space-y-4">
              {pings.map((ping, index) => (
                <li
                  key={ping.id}
                  className={`ping-item p-4 rounded shadow-md ${
                    ping.status === "new" ? "bg-white" : "bg-gray-200"
                  }`}
                  ref={index === pings.length - 1 ? lastPingElementRef : null}
                >
                  <div className="flex items-center">
                    <div className="icon mr-4 text-xl">
                      {getIcon(ping.type)}
                    </div>
                    <div>
                      <p className="text-lg">{ping.message}</p>
                      <span className="text-sm text-gray-500">
                        {formatTime(ping.created_at)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {loading && (
          <div className="loading text-center py-4">
            <span>Loading more notifications...</span>
          </div>
        )}
        {!hasMore && !loading && (
          <div className="no-more text-center py-4">
            <span>No more notifications to load.</span>
          </div>
        )}
        {error && (
          <div className="error text-center py-4 text-red-500">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pings;
