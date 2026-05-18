import "../styles/auth.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ResetPassword() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.newPassword) {
        errors.newPassword = "New password is required";
      } else if (values.newPassword.length < 6) {
        errors.newPassword = "Password must be at least 6 characters";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const res = await axios.post(
          `${API_URL}/api/auth/reset-password`,
          {
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
          { withCredentials: true }
        );

        setSuccessMessage(res.data.message || "Password reset successfully.");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        setErrorMessage(
          err?.response?.data?.message || "Unable to reset password."
        );
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Set a new password after OTP verification.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="input-group password-input-wrapper">
            <label>New Password</label>
            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              ref={passwordRef}
            />
            <span
              className="password-toggle-inside"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="error">{formik.errors.newPassword}</small>
            )}
          </div>

          <div className="input-group password-input-wrapper">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              ref={confirmPasswordRef}
            />
            <span
              className="password-toggle-inside"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <small className="error">{formik.errors.confirmPassword}</small>
            )}
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="auth-btn">
            Reset Password
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

export default ResetPassword;
