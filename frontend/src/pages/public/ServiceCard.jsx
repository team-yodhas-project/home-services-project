// components/ServiceCard.jsx

// components/ServiceCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/customerdashboard")}
      style={{
        background: "#fff",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "0.3s",
        padding: "20px"
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          marginBottom: "10px",
          width: "100%",
          borderRadius: "10px"
        }}
      />

      <h4>{title}</h4>
    </div>
  );
};

export default ServiceCard;

// import React from "react";

// const ServiceCard = ({ title, image }) => {
//   return (
//     <div style={{
//       background: "#fff",
//       // padding: "30px",
//       borderRadius: "10px",
      
//       textAlign: "center",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
//     }}>
//       <img src={image} alt={title} style={{ marginBottom: "10px" }} />
//       <h4>{title}</h4>
//     </div>
//   );
// };

// export default ServiceCard;

