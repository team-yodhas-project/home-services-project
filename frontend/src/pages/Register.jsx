import React, { useState } from "react";
import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useRegisterUserMutation } from "../features/auth/authApi";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialRole = location.state?.role || "customer";
  const [role, setRole] = useState(initialRole);

  const [registerUser, { isLoading, error }] =
    useRegisterUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      skills: "",
      experience: "",
      address: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.name.trim()) errors.name = "Name is required";
      if (!values.email.trim()) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      if (!values.phone.trim()) errors.phone = "Phone is required";

      if (role === "provider") {
        if (!values.skills.trim()) errors.skills = "Skills are required";
        if (!values.experience) errors.experience = "Experience required";
        if (!values.address.trim()) errors.address = "Address required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        phone: values.phone.trim(),
        address:values.address||"",
        role,

        skills:
          role === "provider"
            ? values.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],

        experience:
          role === "provider" ? Number(values.experience) : 0,

        
      };

      try {
        const res = await registerUser(payload).unwrap();

       localStorage.setItem("token", res.token);
        localStorage.setItem("user",res.name);


        navigate(
          res.role === "customer"
            ? "/customerdashboard"
            : "/workerdashboard"
        );
      } catch (err) {
        console.log(err);
      }
    },
  });

  // helper (cleaner code)
  const showError = (field) =>
    formik.touched[field] && formik.errors[field];

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>

        <p className="auth-subtitle">
          Join as Customer or Service Provider
        </p>

        <form onSubmit={formik.handleSubmit}>

          {/* ROLE */}
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

          {/* NAME */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {showError("name") && (
              <small className="error">{formik.errors.name}</small>
            )}
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {showError("email") && (
              <small className="error">{formik.errors.email}</small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {showError("password") && (
              <small className="error">{formik.errors.password}</small>
            )}
          </div>

          {/* PHONE */}
          <div className="input-group">
            <label>Phone</label>
            <input
              name="phone"
              placeholder="Enter phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {showError("phone") && (
              <small className="error">{formik.errors.phone}</small>
            )}
          </div>

          {/* ADDRESS */}
              <div className="input-group">
                <label>City / Location</label>
                <input
                  name="address"
                  placeholder="Enter your location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {showError("address") && (
                  <small className="error">
                    {formik.errors.address}
                  </small>
                )}
              </div>

          {/* PROVIDER ONLY */}
          {role === "provider" && (
            <>
              {/* SKILLS */}
              <div className="input-group">
                <label>Skills</label>
                <input
                  name="skills"
                  placeholder="e.g Plumbing, AC Repair"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.skills}
                />
                {showError("skills") && (
                  <small className="error">
                    {formik.errors.skills}
                  </small>
                )}
              </div>

              {/* EXPERIENCE */}
              <div className="input-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="e.g 2"
                  min="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experience}
                />
                {showError("experience") && (
                  <small className="error">
                    {formik.errors.experience}
                  </small>
                )}
              </div>

              
            </>
          )}

          {/* API ERROR */}
          {error && (
            <p className="error">
              {error?.data?.message || "Something went wrong"}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;