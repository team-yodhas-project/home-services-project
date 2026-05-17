import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiLayers, FiBriefcase, FiLogOut } from "react-icons/fi";
import "../styles/admin/AdminSidebar.css";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: FiHome },
  { label: "Users", to: "/admin/users", icon: FiUsers },
  { label: "Providers", to: "/admin/providers", icon: FiLayers },
  { label: "Services", to: "/admin/services", icon: FiBriefcase },
  { label: "Bookings", to: "/admin/bookings", icon: FiUsers },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <p className="admin-sidebar__label">Admin Panel</p>
        <h1 className="admin-sidebar__title">Home Services</h1>
      </div>

      <nav className="admin-sidebar__menu">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            end={to === "/admin"}
            to={to}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
            }
          >
            <Icon className="admin-sidebar__icon" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <button onClick={handleLogout} className="admin-sidebar__logout">
          <FiLogOut className="admin-sidebar__icon" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
