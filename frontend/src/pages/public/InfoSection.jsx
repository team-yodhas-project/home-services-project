// components/InfoSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const InfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="info-section">
      <div className="container">

        {/* HOW IT WORKS */}
        <div className="how-cards">

          <div className="how-card">
            <span>1</span>
            <h4>Browse Services</h4>
            <p>Explore categories and choose what you need</p>
          </div>

          <div className="how-card">
            <span>2</span>
            <h4>Select Service</h4>
            <p>Pick the service that fits your requirement</p>
          </div>

          <div className="how-card">
            <span>3</span>
            <h4>Book & Relax</h4>
            <p>Schedule and get it done at your fingertips</p>
          </div>

        </div>

        <div className="worker-card">
          <div>
            <h2>Earn with your skills</h2>
            <p>Join Skill Link and connect with customers near you</p>
          </div>

          <button
            className="btn"
            onClick={() => navigate("/register-worker")}
          >
            Register as Worker
          </button>
        </div>

      </div>
    </section>
  );
};

export default InfoSection;