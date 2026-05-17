import { useState } from "react";
import "../customerdashboard.css";

const WriteReview = ({ booking, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          bookingId: booking._id,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Write Review</h2>
            <p className="modal-subtitle">
              {booking.serviceId?.title}
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={submitReview} className="modal-body">
          <label>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="input"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>

          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea"
            placeholder="Share your experience..."
            required
          />

          <button className="btn-primary full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;

// import { useState } from "react";
// import "../customerdashboard.css"

// const WriteReview = ({ booking, onClose }) => {
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   const submitReview = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await fetch(
//         "http://localhost:5000/api/reviews",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-auth-token": token,
//           },
//           body: JSON.stringify({
//             bookingId: booking._id,
//             rating,
//             comment,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message);
//       }

//       alert("Review submitted successfully");
//       onClose();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="review-modal">

//         <div className="modal-header">
//           <div>
//             <h2>Review Service</h2>
//             <p>{booking.serviceId?.title}</p>
//           </div>

//           <button onClick={onClose} className="close-btn">
//             ✕
//           </button>
//         </div>

//         <form onSubmit={submitReview} className="review-form">

//           <label>Rating</label>
//           <select
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//           >
//             {[5,4,3,2,1].map((r) => (
//               <option key={r} value={r}>
//                 {r} Star
//               </option>
//             ))}
//           </select>

//           <label>Comment</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write your experience..."
//             required
//           />

//           <button disabled={loading} className="submit-btn">
//             {loading ? "Submitting..." : "Submit Review"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default WriteReview;