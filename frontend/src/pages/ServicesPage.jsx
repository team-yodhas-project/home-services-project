// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { createBookingAPI, getServicesAPI } from '../features/bookings/bookingAPI';

// const ServicesPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [form, setForm] = useState({ bookingDate: '', timeSlot: '', address: '', notes: '' });
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await getServicesAPI();
//         setServices(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchServices();
//   }, []);

//   const openBooking = (service) => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     if (user?.role !== 'customer') {
//       setMessage('Only customers can request a booking.');
//       return;
//     }

//     setSelectedService(service);
//     setMessage('');
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitBooking = async (e) => {
//     e.preventDefault();
//     if (!selectedService) return;

//     setLoading(true);
//     try {
//       await createBookingAPI({
//         serviceId: selectedService._id,
//         bookingDate: form.bookingDate,
//         timeSlot: form.timeSlot,
//         address: form.address,
//         notes: form.notes,
//       });
//       setMessage('Booking request sent. The provider will accept or reject it soon.');
//       setSelectedService(null);
//       setForm({ bookingDate: '', timeSlot: '', address: '', notes: '' });
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Unable to send booking request.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="page-container">
//       <h2>Available Services</h2>
//       <p>Choose a service and submit a booking request. You can track the status in your dashboard.</p>

//       <div className="service-grid">
//         {services.map((service) => (
//           <div className="service-card" key={service._id}>
//             <h3>{service.title}</h3>
//             <p>{service.category}</p>
//             <p>{service.description}</p>
//             <p>Price: ${service.price}</p>
//             <p>Provider: {service.providerId?.name || 'Unknown'}</p>
//             <button className="btn" onClick={() => openBooking(service)}>
//               Book Service
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedService && (
//         <div className="booking-form">
//           <h3>Request booking for {selectedService.title}</h3>
//           <form onSubmit={submitBooking}>
//             <label>
//               Date
//               <input type="date" name="bookingDate" value={form.bookingDate} onChange={handleChange} required />
//             </label>
//             <label>
//               Time slot
//               <input type="text" name="timeSlot" value={form.timeSlot} onChange={handleChange} placeholder="e.g. 10:00 AM - 12:00 PM" required />
//             </label>
//             <label>
//               Address
//               <input type="text" name="address" value={form.address} onChange={handleChange} required />
//             </label>
//             <label>
//               Notes
//               <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Extra details (optional)" />
//             </label>
//             <button className="btn" type="submit" disabled={loading}>
//               {loading ? 'Sending...' : 'Send Booking Request'}
//             </button>
//           </form>
//         </div>
//       )}

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default ServicesPage;
