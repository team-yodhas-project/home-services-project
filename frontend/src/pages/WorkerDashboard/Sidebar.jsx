import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Provider</h2>

      <Link to="/workerdashboard">Dashboard</Link>
      <Link to="/workerdashboard/addservice">Add Service</Link>
      <Link to="/workerdashboard/myservices">My Services</Link>
      <Link to="/workerdashboard/bookings">Bookings</Link>
    </div>
  );
};

export default Sidebar;