import { useEffect, useState } from "react";
import "./worker.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/bookings/provider",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const data = await res.json();

      // ONLY pending requests
      const pending = data.filter(
        (b) => b.status === "pending"
      );

      setRequests(pending);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const updated = await res.json();

      setRequests((prev) =>
        prev.filter((r) => r._id !== updated._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="requests-page">Loading...</div>
    );
  }

  return (
    <div className="requests-page">

      {/* HEADER */}
      <div className="requests-header">
        <h1>Service Requests</h1>
        <p>New booking requests waiting for your response</p>
      </div>

      {/* EMPTY */}
      {requests.length === 0 ? (
        <div className="empty-state">
          No pending requests
        </div>
      ) : (
        <div className="requests-grid">
          {requests.map((r) => (
            <div key={r._id} className="request-card">

              <div className="top">
                <h2>{r.serviceId?.title}</h2>

                <span className="status-pill pending">
                  pending
                </span>
              </div>

              <div className="meta">
                <p><b>Customer:</b> {r.customerId?.name}</p>
                <p><b>Phone:</b> {r.customerId?.phone || "N/A"}</p>
                <p><b>Date:</b> {new Date(r.bookingDate).toDateString()}</p>
                <p><b>Time:</b> {r.timeSlot}</p>
              </div>

              <div className="address">
                {r.address}
              </div>

              <div className="actions">
                <button
                  onClick={() => updateStatus(r._id, "accepted")}
                  className="accept-btn"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(r._id, "rejected")}
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Requests;

