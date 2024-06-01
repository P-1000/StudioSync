import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { AuthContext } from "../../context/userContext";
import NotificationList from "./NotificationList";

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
      <NotificationList
        groupedPings={groupedPings}
        lastPingElementRef={lastPingElementRef}
      />
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
  );
};

export default Pings;
