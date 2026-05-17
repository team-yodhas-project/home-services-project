import { useState } from "react";
import { useCreateBookingMutation } from "../../../features/bookings/bookingAPI.js";

const BookingModal = ({ service, onClose }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBooking({
        serviceId: service._id,
        bookingDate,
        timeSlot,
        address,
        notes,
      }).unwrap();

      alert("Booking request submitted");
      onClose();
    } catch (err) {
      alert(err?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        
        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>Book Service</h2>
            <p>{service.title}</p>
          </div>

          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="modal-form">

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="text"
              placeholder="e.g. 10AM - 12PM"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              placeholder="Enter full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              placeholder="Describe the issue"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;



