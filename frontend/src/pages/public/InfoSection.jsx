import React from "react";
import { useNavigate } from "react-router-dom";

const InfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="info-section">
      <div className="container">
    
     
        <div className="info-header">
          <h2>Your Skills. Your Needs. One Platform.</h2>
          <p>
            Whether you're looking to get things done or earn from your skills,
            Skill Link makes it simple, fast, and reliable.
          </p>
        </div>

        <div className="info-grid">


          <div className="info-box">
            <h3>Connecting People Seamlessly</h3>
            <p>
              No middlemen, no confusion. Skill Link directly connects customers 
              with skilled professionals in their area — making services faster, 
              more transparent, and more reliable.
            </p>
          </div>

          <div className="info-box">
            <h3>For Customers</h3>
            <p className="sub-text">
              Get your work done without the hassle.
            </p>
            <ul>
              <li>Discover trusted professionals near you</li>
              <li>Compare services and choose confidently</li>
              <li>Book instantly, anytime</li>
            </ul>
            <button
              className="btn"
              onClick={() => navigate("/register")}
            >
              Explore Service at fingertips
            </button>
          </div>

      
          <div className="info-box worker-highlight">
            <h3>For Workers</h3>
            <p className="sub-text">
              Turn your skills into steady income.
            </p>
            <ul>
              <li>Create a professional profile in minutes</li>
              <li>Showcase your expertise and get noticed</li>
              <li>Connect with real customers and grow</li>
            </ul>

            <button
              className="btn"
              onClick={() => navigate("/register", { state: { role: "provider" } })}
            >
              Start Earning Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfoSection;




