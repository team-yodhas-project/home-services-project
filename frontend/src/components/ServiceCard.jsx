// components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ title, image }) => {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <img src={image} alt={title} style={{ width: "60px", marginBottom: "10px" }} />
      <h4>{title}</h4>
      <button style={{ marginTop: "10px" }} className="btn">Book Now</button>
    </div>
  );
};

export default ServiceCard;

