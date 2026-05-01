// components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* LEFT */}
        <div className="footer-left">
          <h2>Skill Link</h2>
          <p>Connecting you with trusted local services</p>
        </div>

        {/* RIGHT */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/services")}>Services</p>
          <p onClick={() => navigate("/login")}>Login</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Skill Link. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;