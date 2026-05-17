// components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ title, image }) => {
  return (
    <div style={{
      background: "#fff",
      // padding: "30px",
      borderRadius: "10px",
      
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <img src={image} alt={title} style={{ marginBottom: "10px" }} />
      <h4>{title}</h4>
    </div>
  );
};

export default ServiceCard;

