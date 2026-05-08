//there are changes not completed
// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
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

        
        <div className="nav-left" onClick={() => navigate("/")}>
          <img
            src="../public/logo.png" 
            alt="logo"
            className="logo"
          />
          <h2>Skill Link</h2>
        </div>

        
        <div className="nav-right">
          {!user ? (
            <>
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn" onClick={() => navigate("/register")}>
              Register
            </button>
            </>
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

