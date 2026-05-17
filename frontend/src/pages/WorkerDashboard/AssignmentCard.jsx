import "./worker.css";

const AssignmentCard = ({ booking, onComplete }) => {
  return (
    <div className="assignment-card">

      {/* LEFT SIDE */}
      <div className="assignment-main">

        <div className="top-row">
          <h2>{booking.serviceId?.title}</h2>

          <span className={`status ${booking.status}`}>
            {booking.status}
          </span>
        </div>

        <div className="info-grid">

          <div>
            <label>Customer</label>
            <p>{booking.customerId?.name}</p>
          </div>

          <div>
            <label>Phone</label>
            <p>{booking.customerId?.phone || "Not available"}</p>
          </div>

          <div>
            <label>Date</label>
            <p>
              {new Date(booking.bookingDate).toDateString()}
            </p>
          </div>

          <div>
            <label>Time</label>
            <p>{booking.timeSlot}</p>
          </div>

        </div>

        <div className="address-box">
          <label>Address</label>
          <p>{booking.address}</p>
        </div>

      </div>

      {/* RIGHT ACTION */}
      <div className="assignment-action">
        <button
          onClick={() => onComplete(booking._id)}
          className="complete-btn"
        >
          Mark Complete
        </button>
      </div>

    </div>
  );
};

export default AssignmentCard;