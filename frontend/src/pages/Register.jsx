import React, { useState } from "react";
import "../styles/auth.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [role, setRole] = useState("customer");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      skills: "",
      experience: "",
      address: "",
    },

    onSubmit: async (values) => {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        role,
        skills:
          role === "provider"
            ? values.skills.split(",").map((s) => s.trim())
            : [],
        experience: role === "provider" ? Number(values.experience) : 0,
        address: role === "provider" ? values.address : "",
      };

      const res = await dispatch(registerUser(payload));

      if (res.meta.requestStatus === "fulfilled") {
        const role = res.payload.role;

        if (role === "customer") navigate("/customerdashboard");
        else navigate("/workerdashboard");
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">
          Join as a Customer or Service Provider
        </p>

        <form onSubmit={formik.handleSubmit}>

          {/* 🔥 Role Selection */}
          <div className="role-select">
            <label>
              <input
                type="radio"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
              />
              Customer
            </label>

            <label>
              <input
                type="radio"
                checked={role === "provider"}
                onChange={() => setRole("provider")}
              />
              Provider
            </label>
          </div>

          {/* Name */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>

          {/* 🔥 Provider Fields */}
          {role === "provider" && (
            <>
              <div className="input-group">
                <label>Skills</label>
                <input
                  name="skills"
                  placeholder="e.g Plumbing, AC Repair"
                  onChange={formik.handleChange}
                  value={formik.values.skills}
                />
              </div>

              <div className="input-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="e.g 2"
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                />
              </div>

              <div className="input-group">
                <label>City / Location</label>
                <input
                  name="address"
                  placeholder="Enter your location"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </div>
            </>
          )}

          {/* Error */}
          {error && <p className="error">{error}</p>}

          {/* Button */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>

      </div>
    </div>
  );
}

export default Register;

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [role, setRole] = useState("customer");

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       skills: "",
//       experience: "",
//       address: "",
//     },

//     onSubmit: async (values) => {
//       const payload = {
//         name: values.name.trim(),
//         email: values.email.trim(),
//         password: values.password,
//         role,
//         skills: role === "provider" ? values.skills.split(",").map(s => s.trim()) : [],
//         experience: role === "provider" ? Number(values.experience) : 0,
//         address: role === "provider" ? values.address : "",
//       };

//       const res = await dispatch(registerUser(payload));

//       if (res.meta.requestStatus === "fulfilled") {
//         const role = res.payload.role;

//         if (role === "customer") navigate("/customer/dashboard");
//         else if (role === "provider") navigate("/provider/dashboard");
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Register</h2>

//         {/* 🔥 Role Toggle */}
//         <div className="flex justify-around">
//           <button
//             type="button"
//             onClick={() => setRole("customer")}
//             className={`px-4 py-2 rounded ${
//               role === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             Customer
//           </button>

//           <button
//             type="button"
//             onClick={() => setRole("provider")}
//             className={`px-4 py-2 rounded ${
//               role === "provider" ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             Worker
//           </button>
//         </div>

//         {/* Common Fields */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={formik.handleChange}
//           value={formik.values.name}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={formik.handleChange}
//           value={formik.values.email}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//           className="w-full border p-2 rounded"
//         />

//         {/* 🔥 Conditional Worker Fields */}
//         {role === "provider" && (
//           <>
//             <input
//               type="text"
//               name="skills"
//               placeholder="Skills (comma separated)"
//               onChange={formik.handleChange}
//               value={formik.values.skills}
//               className="w-full border p-2 rounded"
//             />

//             <input
//               type="number"
//               name="experience"
//               placeholder="Experience (years)"
//               onChange={formik.handleChange}
//               value={formik.values.experience}
//               className="w-full border p-2 rounded"
//             />

//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               onChange={formik.handleChange}
//               value={formik.values.address}
//               className="w-full border p-2 rounded"
//             />
//           </>
//         )}

//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

