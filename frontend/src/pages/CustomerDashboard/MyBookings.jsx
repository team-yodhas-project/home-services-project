import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/bookings/customer",
        {
          headers: { "x-auth-token": token },
        }
      );

      const data = await res.json();

      // ONLY pending bookings here
      const pending = data.filter(
        (b) => b.status === "pending"
      );

      setBookings(pending);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const updated = await res.json();

      if (!res.ok) throw new Error(updated.message);

      setBookings((prev) =>
        prev.filter((b) => b._id !== id)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <div className="bookings-page">

      <div className="bookings-header">
        <h1>Pending Bookings</h1>
        <p>Manage your upcoming service requests</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          No pending bookings
        </div>
      ) : (
        <div className="booking-grid">

          {bookings.map((b) => (
            <div key={b._id} className="booking-card">

              <div className="top-row">
                <h2>{b.serviceId?.title}</h2>

                <span className="status pending">
                  Pending
                </span>
              </div>

              <div className="meta">
                <p><span>Provider:</span> {b.providerId?.name}</p>
                <p><span>Date:</span> {new Date(b.bookingDate).toDateString()}</p>
                <p><span>Time:</span> {b.timeSlot}</p>
              </div>

              <div className="address">
                {b.address}
              </div>

              <button
                onClick={() => cancelBooking(b._id)}
                className="cancel-btn"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyBookings;