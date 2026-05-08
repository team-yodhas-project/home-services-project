import { useState } from "react";
import axios from "axios";

const AddService = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    price: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/services/createService",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Service created");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Service</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option>Plumbing</option>
        <option>Electrical</option>
        <option>Cleaning</option>
      </select>

      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default AddService;