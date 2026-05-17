import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* HEADER */}
      <div className="sidebar-header">
        <h2>Customer Panel</h2>
        <p>Manage your services</p>
      </div>

      {/* MAIN NAV */}
      <div className="sidebar-links">

      <Link
          to="/"
          className={isActive("/") ? "active-link" : ""}
        >Home</Link>

        <Link
          to="/customerdashboard"
          className={isActive("/customerdashboard") ? "active-link" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/customerdashboard/mybookings"
          className={isActive("/customerdashboard/mybookings") ? "active-link" : ""}
        >
          My Bookings
        </Link>

        <Link
          to="/customerdashboard/history"
          className={isActive("/customerdashboard/history") ? "active-link" : ""}
        >
          History
        </Link>
      </div>

      {/* ACCOUNT SECTION */}
      <div className="sidebar-bottom">

        <Link
          to="/customerdashboard/change-password"
          className={isActive("/customerdashboard/change-password") ? "active-link" : ""}
        >
          Change Password
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Sign Out
        </button>

      </div>
    </div>
  );
};

export default Sidebar;

