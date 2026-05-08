// import "./customerdashboard.css";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
  
//   return (
//     <div className="hero-card">
//       <div className="hero-left">
//         <h2>Welcome back, {user?.name || "User"} 👋</h2>
//         <p>Book trusted services near you in just a few clicks.</p>

//         <div className="hero-actions">
//           <button onClick={() => navigate("/services")} className="primary-btn">
//             Explore Services
//           </button>
//           <button onClick={() => navigate("/bookings")} className="secondary-btn">
//             My Bookings
//           </button>
//         </div>
//       </div>

//       <div className="hero-right">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
//           alt="services"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;