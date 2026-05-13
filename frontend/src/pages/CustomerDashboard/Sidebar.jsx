const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">HomeServices</h2>

      <ul>
        <li className="active">🏠 Home</li>
        <li>📅 My Bookings</li>
        <li>👤 Profile</li>
        <li>🚪 Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;