import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import "./worker.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
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

      // ONLY accepted + on_the_way
      const active = data.filter(
        (b) =>
          b.status === "accepted" ||
          b.status === "on_the_way"
      );

      setBookings(active);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            status: "completed",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const updated = await res.json();

      setBookings((prev) =>
        prev.filter((b) => b._id !== updated._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="provider-page">
        Loading assignments...
      </div>
    );
  }

  return (
    <div className="provider-page">

      {/* WELCOME CARD */}
      <div className="provider-header">
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>Here are your active assignments</p>
      </div>

      {/* SECTION TITLE */}
      <div className="section-title">
        Assignments
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="empty-box">
          No active assignments
        </div>
      ) : (
        <div className="assignment-list">
          {bookings.map((b) => (
            <AssignmentCard
              key={b._id}
              booking={b}
              onComplete={markCompleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;

// function Bookings()
// {
//     return <>
//         <h1>bookings</h1>
//     </>
// }

// export default Bookings;