const BookingPanel = () => {
  return (
    <div className="booking-panel">
      <h3>Book Service</h3>

      <label>Date</label>
      <input type="date" />

      <label>Time</label>
      <select>
        <option>10:00 AM - 12:00 PM</option>
        <option>12:00 PM - 2:00 PM</option>
      </select>

      <label>Address</label>
      <textarea placeholder="Enter address"></textarea>

      <button className="confirm-btn">Confirm Booking</button>
    </div>
  );
};

export default BookingPanel;