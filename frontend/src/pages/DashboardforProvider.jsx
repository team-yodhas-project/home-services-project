// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getProviderBookingsAPI, updateBookingStatusAPI, cancelBookingAPI } from '../features/bookings/bookingAPI';

// const statusLabel = {
//   pending: 'Pending',
//   accepted: 'Accepted',
//   on_the_way: 'On the way',
//   rejected: 'Rejected',
//   completed: 'Completed',
//   cancelled: 'Cancelled',
// };

// const Worker_Dashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         const res = await getProviderBookingsAPI();
//         setBookings(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load booking requests.');
//       }
//       setLoading(false);
//     };

//     fetchBookings();
//   }, []);

//   const updateStatus = async (bookingId, nextStatus) => {
//     try {
//       const res = await updateBookingStatusAPI(bookingId, nextStatus);
//       setBookings((prev) => prev.map((item) => (item._id === bookingId ? res.data : item)));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to update booking status.');
//     }
//   };

//   const handleCancel = async (bookingId) => {
//     try {
//       const res = await cancelBookingAPI(bookingId);
//       setBookings((prev) => prev.map((item) => (item._id === bookingId ? res.data : item)));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Unable to cancel booking.');
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Provider Dashboard</h2>
//       <p>Welcome back, {user?.name}. Manage incoming bookings and update status as you go.</p>

//       {loading && <p>Loading booking requests...</p>}
//       {error && <p className="error-message">{error}</p>}

//       <div className="booking-list">
//         {bookings.length === 0 ? (
//           <p>No booking requests yet.</p>
//         ) : (
//           bookings.map((booking) => (
//             <div className="booking-card" key={booking._id}>
//               <h3>{booking.serviceId?.title || 'Service'}</h3>
//               <p>Customer: {booking.customerId?.name || 'Unknown'}</p>
//               <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
//               <p>Time slot: {booking.timeSlot}</p>
//               <p>Address: {booking.address}</p>
//               <p>Status: <strong>{statusLabel[booking.status] || booking.status}</strong></p>
//               {booking.notes && <p>Notes: {booking.notes}</p>}

//               <div className="booking-actions">
//                 {booking.status === 'pending' && (
//                   <>
//                     <button className="btn" onClick={() => updateStatus(booking._id, 'accepted')}>
//                       Accept
//                     </button>
//                     <button className="btn btn-secondary" onClick={() => updateStatus(booking._id, 'rejected')}>
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {booking.status === 'accepted' && (
//                   <>
//                     <button className="btn" onClick={() => updateStatus(booking._id, 'on_the_way')}>
//                       Mark on the way
//                     </button>
//                     <button className="btn btn-secondary" onClick={() => handleCancel(booking._id)}>
//                       Cancel
//                     </button>
//                   </>
//                 )}
//                 {booking.status === 'on_the_way' && (
//                   <button className="btn" onClick={() => updateStatus(booking._id, 'completed')}>
//                     Mark completed
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Worker_Dashboard;