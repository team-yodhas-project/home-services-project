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



// import { useEffect, useState } from "react";
// import "./worker.css";

// export default function MyServices() {

//   const [services, setServices] = useState([
//     {
//       _id: "1",
//       title: "AC Repair Service",
//       description:
//         "Professional AC repair and maintenance service for homes and offices.",
//       category: "AC Repair",
//       price: 499,
//       createdAt: new Date(),
//     },

//     {
//       _id: "2",
//       title: "Home Cleaning",
//       description:
//         "Deep cleaning solutions with experienced professionals.",
//       category: "Cleaning",
//       price: 799,
//       createdAt: new Date(),
//     },
//   ]);

//   const [editModal, setEditModal] = useState(false);

//   const [selectedService, setSelectedService] =
//     useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//   });

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm(
//       "Delete this service permanently?"
//     );

//     if (!confirmDelete) return;

//     setServices((prev) =>
//       prev.filter((service) => service._id !== id)
//     );
//   };

//   const openEditModal = (service) => {
//     setSelectedService(service);

//     setFormData({
//       title: service.title,
//       description: service.description,
//       category: service.category,
//       price: service.price,
//     });

//     setEditModal(true);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     setServices((prev) =>
//       prev.map((service) =>
//         service._id === selectedService._id
//           ? {
//               ...service,
//               ...formData,
//             }
//           : service
//       )
//     );

//     setEditModal(false);
//   };

//   return (
//     <div className="services-page">

//       {/* Header */}

//       <div className="services-header">

//         <div>
//           <h1>My Services</h1>

//           <p>
//             Manage your services and pricing
//           </p>
//         </div>

//         <div className="service-count">
//           {services.length} Services
//         </div>

//       </div>

//       {/* Empty State */}

//       {services.length === 0 ? (

//         <div className="empty-state">

//           <div className="empty-icon">
//             🛠️
//           </div>

//           <h2>No Services Added</h2>

//           <p>
//             Start creating services so customers can discover your work.
//           </p>

//           <button>
//             Add Service
//           </button>

//         </div>

//       ) : (

//         <div className="services-grid">

//           {services.map((service) => (

//             <div
//               className="service-card"
//               key={service._id}
//             >

//               <div className="card-top">

//                 <span className="category-badge">
//                   {service.category}
//                 </span>

//                 {/* <span className="active-badge">
//                   Active
//                 </span> */}

//               </div>

//               <h2>
//                 {service.title}
//               </h2>

//               <p className="description">
//                 {service.description}
//               </p>

//               <div className="service-meta">

//                 <span>
//                   {new Date(
//                     service.createdAt
//                   ).toLocaleDateString()}
//                 </span>

//                 <span>
//                   #{service._id}
//                 </span>

//               </div>

//               <div className="price-box">

//                 <p>Starting At</p>

//                 <h3>
//                   ₹{service.price}
//                 </h3>

//               </div>

//               <div className="card-actions">

//                 <button
//                   className="update-btn"
//                   onClick={() =>
//                     openEditModal(service)
//                   }
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="delete-btn"
//                   onClick={() =>
//                     handleDelete(service._id)
//                   }
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}

//       {editModal && (

//         <div className="modal-overlay">

//           <div className="modal">

//             <button
//               className="close-btn"
//               onClick={() =>
//                 setEditModal(false)
//               }
//             >
//               ×
//             </button>

//             <h2>
//               Update Service
//             </h2>

//             <form onSubmit={handleUpdate}>

//               <div className="form-group">

//                 <label>
//                   Title
//                 </label>

//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       title: e.target.value,
//                     })
//                   }
//                 />

//               </div>

//               <div className="form-group">

//                 <label>
//                   Description
//                 </label>

//                 <textarea
//                   rows="5"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       description:
//                         e.target.value,
//                     })
//                   }
//                 />

//               </div>

//               <div className="form-group">

//                 <label>
//                   Price
//                 </label>

//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       price: e.target.value,
//                     })
//                   }
//                 />

//               </div>

//               <button
//                 type="submit"
//                 className="save-btn"
//               >
//                 Save Changes
//               </button>

//             </form>

//           </div>

//         </div>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";

// export default function MyServices() {
//   const categories = [
//     "Cleaning",
//     "Plumbing",
//     "Electrical",
//     "Carpentry",
//     "Painting",
//     "Appliance Repair",
//     "AC Repair",
//     "Pest Control",
//     "Salon",
//     "Spa",
//     "Massage Therapy",
//     "Home Deep Cleaning",
//     "Bathroom Cleaning",
//     "Kitchen Cleaning",
//     "Sofa Cleaning",
//     "Car Wash",
//     "Laptop Repair",
//     "Mobile Repair",
//     "TV Repair",
//     "Refrigerator Repair",
//     "Washing Machine Repair",
//     "Water Purifier Repair",
//     "CCTV Installation",
//     "Interior Design",
//     "Furniture Assembly",
//     "Gardening",
//     "Packers and Movers",
//     "Electrician Visit",
//     "Plumber Visit",
//     "Driver Service",
//     "Cook Service",
//     "Baby Sitting",
//     "Pet Care",
//     "Fitness Trainer",
//     "Yoga Trainer",
//     "Tuition",
//     "Photography",
//     "Event Decoration",
//     "Makeup Artist",
//     "Other",
//   ];

//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//   });

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch("http://localhost:5000/api/services", {
//         headers: {
//           "x-auth-token": token,
//         },
//       });

//       const data = await response.json();
//       console.log(data);
      
//       const myServices = data.filter(
//         (service) => service.providerId?._id === user?._id
//       );

//       setServices(myServices);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this service?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/services/deleteService/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "x-auth-token": token,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete service");
//       }

//       setServices((prev) =>
//         prev.filter((service) => service._id !== id)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const openEditModal = (service) => {
//     setSelectedService(service);

//     setFormData({
//       title: service.title,
//       description: service.description,
//       category: service.category,
//       price: service.price,
//     });

//     setEditModal(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/services/updateService/${selectedService._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             "x-auth-token": token,
//           },
//           body: JSON.stringify({
//             title: formData.title,
//             description: formData.description,
//             category: formData.category,
//             price: Number(formData.price),
//           }),
//         }
//       );

//       const updatedService = await response.json();

//       if (!response.ok) {
//         throw new Error(updatedService.message);
//       }

//       setServices((prev) =>
//         prev.map((service) =>
//           service._id === updatedService._id
//             ? updatedService
//             : service
//         )
//       );

//       setEditModal(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="w-full flex items-center justify-center py-20">
//         <h1 className="text-xl font-semibold text-gray-500">
//           Loading Services...
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-6 py-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             My Services
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Manage and update your services
//           </p>
//         </div>

//         <div className="bg-black text-white px-5 py-3 rounded-2xl font-semibold">
//           {services.length} Services
//         </div>
//       </div>

//       {/* Empty State */}
//       {services.length === 0 ? (
//         <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
//           <h2 className="text-2xl font-bold text-gray-800 mb-3">
//             No Services Added
//           </h2>

//           <p className="text-gray-500 mb-6">
//             Start by creating your first service for customers.
//           </p>

//           <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
//             Add Service
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
//           {services.map((service) => (
//             <div
//               key={service._id}
//               className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
//             >
//               {/* Category */}
//               <div className="mb-5">
//                 <span className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full font-medium">
//                   {service.category}
//                 </span>
//               </div>

//               {/* Title */}
//               <h2 className="text-2xl font-bold text-gray-800 mb-3">
//                 {service.title}
//               </h2>

//               {/* Description */}
//               <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
//                 {service.description}
//               </p>

//               {/* Price */}
//               <div className="mb-6">
//                 <p className="text-sm text-gray-400 mb-1">
//                   Starting Price
//                 </p>

//                 <h3 className="text-3xl font-bold text-black">
//                   ₹{service.price}
//                 </h3>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => openEditModal(service)}
//                   className="flex-1 bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
//                 >
//                   Update
//                 </button>

//                 <button
//                   onClick={() => handleDelete(service._id)}
//                   className="flex-1 border border-red-500 text-red-500 py-3 rounded-2xl font-semibold hover:bg-red-50 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
//           <div className="bg-white w-full max-w-2xl rounded-3xl p-8 relative">
//             {/* Close */}
//             <button
//               onClick={() => setEditModal(false)}
//               className="absolute top-5 right-5 text-2xl text-gray-500"
//             >
//               ×
//             </button>

//             <h2 className="text-3xl font-bold mb-8">
//               Update Service
//             </h2>

//             <form onSubmit={handleUpdate} className="space-y-5">
//               <div>
//                 <label className="block mb-2 font-medium">
//                   Title
//                 </label>

//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       title: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded-2xl px-4 py-3 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium">
//                   Description
//                 </label>

//                 <textarea
//                   rows="5"
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded-2xl px-4 py-3 outline-none resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium">
//                   Category
//                 </label>

//                 <select
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       category: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded-2xl px-4 py-3 outline-none bg-white"
//                 >
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block mb-2 font-medium">
//                   Price
//                 </label>

//                 <input
//                   type="number"
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       price: e.target.value,
//                     })
//                   }
//                   className="w-full border rounded-2xl px-4 py-3 outline-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
//               >
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


