const Header = ({ user }) => {
  return (
    <div className="header">
      <div className="search-bar">
        <select>
          <option>Plumbing</option>
          <option>Cleaning</option>
        </select>

        <input type="text" placeholder="Enter location..." />
        <button>Search</button>
      </div>

      <div className="user-info">
        🔔
        <span>{user}</span>
      </div>
    </div>
  );
};

export default Header;