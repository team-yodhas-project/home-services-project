
// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* LEFT */}
        <div className="nav-left" onClick={() => navigate("/")}>
          <img
            src="/logo.png" // put your logo in public folder
            alt="logo"
            className="logo"
          />
          <h2>Skill Link</h2>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {!user ? (
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <>
              <button
                className="btn"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>

              <button
                className="btn logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;