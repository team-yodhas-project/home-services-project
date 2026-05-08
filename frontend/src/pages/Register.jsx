import React, { useState } from "react";
import "../styles/auth.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"



function Register() {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const initialRole = location.state?.role || "customer";
  
  const [role, setRole] = useState(initialRole);

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


