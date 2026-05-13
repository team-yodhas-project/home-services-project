import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCustomerBookingsAPI, cancelBookingAPI } from '../features/bookings/bookingAPI';

const statusLabel = {
  pending: 'Pending',
  accepted: 'Accepted',
  on_the_way: 'On the way',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const Customer_Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await getCustomerBookingsAPI();
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings.');
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const res = await cancelBookingAPI(bookingId);
      setBookings((prev) => prev.map((item) => (item._id === bookingId ? res.data : item)));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to cancel booking.');
    }
  };

  return (
    <div className="page-container">
      <h2>Customer Dashboard</h2>
      <p>Welcome back, {user?.name}.</p>
      <p>Track your booking requests and watch status updates from the service provider.</p>
      <button className="btn" onClick={() => navigate('/services')}>
        Browse Services
      </button>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>
            No bookings yet. <button className="btn" onClick={() => navigate('/services')}>Browse services</button>
          </p>
        ) : (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.serviceId?.title || 'Service'}</h3>
              <p>Provider: {booking.providerId?.name || 'Unknown'}</p>
              <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Time slot: {booking.timeSlot}</p>
              <p>Address: {booking.address}</p>
              <p>Status: <strong>{statusLabel[booking.status] || booking.status}</strong></p>
              {booking.notes && <p>Notes: {booking.notes}</p>}
              
              {['pending', 'accepted'].includes(booking.status) && (
                <div className="booking-actions">
                  <button className="btn btn-secondary" onClick={() => handleCancel(booking._id)}>
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Customer_Dashboard;
