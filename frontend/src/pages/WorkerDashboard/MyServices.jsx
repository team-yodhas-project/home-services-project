import { useEffect, useState } from "react";
import axios from "axios";

const MyServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/services/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setServices(res.data);
    };

    fetchServices();
  }, []);

  const deleteService = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/services/deleteService/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setServices(services.filter(s => s._id !== id));
  };

  return (
    <div>
      <h2>My Services</h2>

      {services.map((s) => (
        <div key={s._id} className="service-card">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p>₹{s.price}</p>

          <button>Edit</button>
          <button onClick={() => deleteService(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyServices;