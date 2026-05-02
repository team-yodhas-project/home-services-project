
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../features/auth/authSlice";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error } = useSelector((state) => state.auth);

//   const [showPassword, setShowPassword] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },

//     onSubmit: async (values) => {
//       const res = await dispatch(loginUser(values));

//       if (res.meta.requestStatus === "fulfilled") {
//         const role = res.payload.role;

//         if (role === "customer") navigate("/customerdashboard");
//         else if (role === "provider") navigate("/workerdashboard");
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-xl shadow-md w-96 space-y-5">

//         <h2 className="text-xl font-bold text-center">Welcome Back</h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             className="w-full border p-2 rounded"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter your password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//               className="w-full border p-2 rounded pr-10"
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2 cursor-pointer text-sm"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-sm text-center">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-blue-600">
//               Register
//             </Link>
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import "../styles/auth.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const res = await dispatch(loginUser(values));

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

        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={formik.handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group password-box">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
        </div>

      </div>
    </div>
  );
}

export default Login;