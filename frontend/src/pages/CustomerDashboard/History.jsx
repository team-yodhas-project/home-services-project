import { useEffect, useState } from "react";
import WriteReview from "./CustomerMain/WriteReview";
import "../CustomerDashboard/customerdashboard.css";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openReview, setOpenReview] = useState(false);

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
      setBookings(data.filter((b) => b.status !== "pending"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Booking History</h1>
        <p>Your completed and past service records</p>
      </div>

      {loading ? (
        <div className="empty-state">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">No history found</div>
      ) : (
        <div className="history-list">
          {bookings.map((b) => (
            <div key={b._id} className="history-card">
              <div className="history-left">
                <h2 className="history-title">{b.serviceId?.title}</h2>

                <div className="history-meta">
                  <span>{b.providerId?.name}</span>
                  <span>{new Date(b.bookingDate).toDateString()}</span>
                  <span>{b.timeSlot}</span>
                </div>
              </div>

              <div className="history-status">
                <span className={`status-pill ${b.status}`}>
                  {b.status}
                </span>
              </div>

              <div className="history-action">
                {b.status === "completed" ? (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSelectedBooking(b);
                      setOpenReview(true);
                    }}
                  >
                    Give a Review
                  </button>
                ) : (
                  <button className="btn-disabled" disabled>
                    {b.status}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {openReview && (
        <WriteReview
          booking={selectedBooking}
          onClose={() => setOpenReview(false)}
        />
      )}
    </div>
  );
};

export default History;

// import { useEffect, useState } from "react";
// import WriteReview from "./CustomerMain/WriteReview";
// import "../CustomerDashboard/customerdashboard.css";

// const History = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [openReview, setOpenReview] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(
//         "http://localhost:5000/api/bookings/customer",
//         {
//           headers: { "x-auth-token": token },
//         }
//       );

//       const data = await res.json();

//       // history = everything except pending
//       const history = data.filter((b) => b.status !== "pending");
//       setBookings(history);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openReviewModal = (booking) => {
//     setSelectedBooking(booking);
//     setOpenReview(true);
//   };

//   if (loading) {
//     return <div className="history-page">Loading...</div>;
//   }

//   return (
//     <div className="history-page">

//       {/* HEADER */}
//       <div className="history-header">
//         <h1>Booking History</h1>
//         <p>Completed, cancelled and past service records</p>
//       </div>

//       {/* EMPTY STATE */}
//       {bookings.length === 0 ? (
//         <div className="empty-state">No history found</div>
//       ) : (
//         <div className="history-list">

//           {bookings.map((b) => (
//             <div key={b._id} className="history-card">

//               {/* LEFT */}
//               <div className="history-left">
//                 <h2 className="history-title">
//                   {b.serviceId?.title}
//                 </h2>

//                 <div className="history-meta">
//                   <span>👤 {b.providerId?.name}</span>
//                   <span>📅 {new Date(b.bookingDate).toDateString()}</span>
//                   <span>⏰ {b.timeSlot}</span>
//                 </div>
//               </div>

//               {/* MIDDLE - STATUS */}
//               <div className="history-status">
//                 <span className={`status-pill ${b.status}`}>
//                   {b.status === "on_the_way"
//                     ? "on the way"
//                     : b.status}
//                 </span>
//               </div>

//               {/* RIGHT - ACTION */}
//               <div className="history-action">
//                 {b.status === "completed" ? (
//                   <button
//                     className="btn-primary"
//                     onClick={() => openReviewModal(b)}
//                   >
//                     Give Review
//                   </button>
//                 ) : (
//                   <button className="btn-disabled" disabled>
//                     {b.status}
//                   </button>
//                 )}
//               </div>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* REVIEW MODAL */}
//       {openReview && (
//         <WriteReview
//           booking={selectedBooking}
//           onClose={() => setOpenReview(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default History;


