import { useEffect, useState } from "react";
import "./worker.css";
import { Navigate, useNavigate } from "react-router-dom";

const categories = [
   "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Appliance Repair",
    "Other"
];

export default function MyServices() {
    const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModal, setEditModal] = useState(false);

  const [selectedService, setSelectedService] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/services",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();

      const myServices = data.filter(
        (service) =>
          service.providerId?._id === user?._id
      );

      setServices(myServices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this service permanently?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/services/deleteService/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete service"
        );
      }

      setServices((prev) =>
        prev.filter(
          (service) => service._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (service) => {
    setSelectedService(service);

    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
    });

    setEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/services/updateService/${selectedService._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            title: formData.title,
            description:
              formData.description,
            category: formData.category,
            price: Number(formData.price),
          }),
        }
      );

      const updatedService =
        await response.json();

      if (!response.ok) {
        throw new Error(
          updatedService.message
        );
      }

      setServices((prev) =>
        prev.map((service) =>
          service._id === updatedService._id
            ? updatedService
            : service
        )
      );

      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="services-page">
        <div className="empty-state">
          <h2>Loading Services...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Header */}

      <div className="services-header">
        <div>
          <h1>My Services</h1>

          <p>
            Manage your services and pricing
          </p>
        </div>

        <div className="service-count">
          {services.length} Services
        </div>
      </div>

      {/* Empty State */}

      {services.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            🛠️
          </div>

          <h2>No Services Added</h2>

          <p>
            Start creating services so
            customers can discover your
            work.
          </p>

          <button onClick={() => navigate("/workerdashboard/addservice")}>
            Add Service
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div
              className="service-card"
              key={service._id}
            >
              <div className="card-top">
                <span className="category-badge">
                  {service.category}
                </span>

                
              </div>

              <h2>{service.title}</h2>

              <p className="description">
                {service.description}
              </p>

              <div className="service-meta">
                <span>
                  {new Date(
                    service.createdAt
                  ).toLocaleDateString()}
                </span>

                
              </div>

              <div className="price-box">
                <p>Starting At</p>

                <h3>
                  ₹{service.price}
                </h3>
              </div>

              <div className="card-actions">
                <button
                  className="update-btn"
                  onClick={() =>
                    openEditModal(service)
                  }
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      service._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}

      {editModal && (
        <div
          className="modal-overlay"
          onClick={() =>
            setEditModal(false)
          }
        >
          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="close-btn"
              onClick={() =>
                setEditModal(false)
              }
            >
              ×
            </button>

            <h2>Update Service</h2>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Title</label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Description
                </label>

                <textarea
                  rows="5"
                  value={
                    formData.description
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category:
                        e.target.value,
                    })
                  }
                >
                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price:
                        e.target.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



