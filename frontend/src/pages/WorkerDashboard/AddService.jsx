import { useState } from "react";
import "./worker.css";

export default function AddService() {
  const categories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Appliance Repair",
    "Other"
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.price
    ) {
      setError("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/services/createService",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            "x-auth-token": token,
          },

          body: JSON.stringify({
            title: formData.title,

            description: formData.description,

            category: formData.category,

            price: Number(formData.price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create service"
        );
      }

      setSuccess("Service created successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
      });

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-wrapper">

      <div className="service-card">

        <h2 className="service-title">
          Add Service
        </h2>

        <p className="service-subtitle">
          Add your professional service details
        </p>

        <form
          onSubmit={handleSubmit}
          className="service-form-grid"
        >

          {/* TITLE */}

          <div className="service-input-group">

            <label>Service Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter service title"
            />

          </div>

          {/* CATEGORY */}

          <div className="service-input-group">

            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}

            </select>

          </div>

          {/* DESCRIPTION */}

          <div className="service-input-group ">

            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your service"
              rows="6"
            />

          </div>

          {/* PRICE */}

          <div className="service-input-group">

            <label>Starting Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter base price"
            />

          </div>

          

          {/* ERROR */}

          {error && (
            <div className="service-error full-width">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="service-success full-width">
              {success}
            </div>
          )}

          {/* BUTTON */}

          <div>

            <button
              type="submit"
              disabled={loading}
              className="service-btn"
            >
              {loading
                ? "Creating..."
                : "Create Service"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
