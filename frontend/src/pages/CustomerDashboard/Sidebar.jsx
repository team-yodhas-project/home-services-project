import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Provider</h2>

      <Link to="/customerdashboard">Dashboard</Link>
      <Link to="/customerdashboard/mybookings">My Bookings</Link>
      {/* <Link to="/customerdashboard/profile">My Services</Link> */}
      <Link to="/customerdashboard/history">History</Link>
    </div>
  );
};

export default Sidebar;


// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2 className="logo">HomeServices</h2>

//       <ul>
//         <li className="active">🏠 Home</li>
//         <li>📅 My Bookings</li>
//         <li>👤 Profile</li>
//         <li>🚪 Logout</li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;