import "../styles/auth.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email && !values.phone) {
        errors.email = "Email or phone is required";
      } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const res = await axios.post(
          `${API_URL}/api/auth/forgot-password`,
          {
            email: values.email || undefined,
            phone: values.phone || undefined,
          },
          { withCredentials: true }
        );

        setSuccessMessage(res.data.message || "OTP sent. Check your email or phone.");
        setTimeout(() => navigate("/verify-reset-otp"), 1200);
      } catch (err) {
        setErrorMessage(
          err?.response?.data?.message || "Unable to send OTP. Please try again."
        );
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email or phone to receive an OTP.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              ref={emailRef}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="error">{formik.errors.email}</small>
            )}
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="auth-btn">
            Send OTP
          </button>
        </form>

        <div className="auth-footer">
          Remembered your password?{' '}
          <span onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
