import { Link, useNavigate } from "react-router-dom";
import "./worker.css";

const Sidebar = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  const handleLogout = () => {
  dispatch(logout());
  // dispatch(authApi.util.resetApiState());

  navigate("/login");
};

  return (
    <div className="worker-sidebar">

      <h2 className="sidebar-title">Provider</h2>

      {/* NAV LINKS */}
      <div className="sidebar-links">
        <Link to="/">Home</Link>
        <Link to="/workerdashboard">Dashboard</Link>
        <Link to="/workerdashboard/addservice">Add Service</Link>
        <Link to="/workerdashboard/myservices">My Services</Link>
        <Link to="/workerdashboard/requests">Requests</Link>
      </div>

      {/* ACCOUNT ACTIONS */}
      <div className="sidebar-bottom">
        <Link to="/workerdashboard/change-password">
          Change Password
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;