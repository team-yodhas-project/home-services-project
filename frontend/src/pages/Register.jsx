import React, { useState } from "react";
import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";

import { useRegisterUserMutation }
from "../features/auth/authApi";

function Register() {

  const location = useLocation();
  const navigate = useNavigate();

  const initialRole =
    location.state?.role || "customer";

  const [role, setRole] =
    useState(initialRole);

  // RTK QUERY MUTATION
  const [
    registerUser,
    { isLoading, error }
  ] = useRegisterUserMutation();

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
            ? values.skills
                .split(",")
                .map((s) => s.trim())
            : [],

        experience:
          role === "provider"
            ? Number(values.experience)
            : 0,

        address:
          role === "provider"
            ? values.address
            : "",
      };

      try {

        // API CALL
        const res =
          await registerUser(payload).unwrap();

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.token
        );

        // NAVIGATION
        if (res.role === "customer") {
          navigate("/customerdashboard");
        } else {
          navigate("/workerdashboard");
        }

      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="auth-wrapper">

      <div className="auth-card">

        <h2 className="auth-title">
          Create an Account
        </h2>

        <p className="auth-subtitle">
          Join as a Customer or Service Provider
        </p>

        <form onSubmit={formik.handleSubmit}>

          {/* ROLE */}

          <div className="role-select">

            <label>
              <input
                type="radio"
                checked={role === "customer"}
                onChange={() =>
                  setRole("customer")
                }
              />

              Customer
            </label>

            <label>
              <input
                type="radio"
                checked={role === "provider"}
                onChange={() =>
                  setRole("provider")
                }
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
              value={formik.values.name}
            />

          </div>

          {/* EMAIL */}

          <div className="input-group">

            <label>Email</label>

            <input
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

          </div>

          {/* PASSWORD */}

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

          {/* PROVIDER FIELDS */}

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

                <label>
                  Experience (Years)
                </label>

                <input
                  type="number"
                  name="experience"
                  placeholder="e.g 2"
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                />

              </div>

              <div className="input-group">

                <label>
                  City / Location
                </label>

                <input
                  name="address"
                  placeholder="Enter your location"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />

              </div>

            </>
          )}

          {/* ERROR */}

          {error && (
            <p className="error">
              {error?.data?.message ||
               error?.data?.msg ||
               "Something went wrong"}
            </p>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        {/* FOOTER */}

        <div className="auth-footer">

          Already have an account?{" "}

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        </div>

      </div>

    </div>
  );
}

export default Register;

