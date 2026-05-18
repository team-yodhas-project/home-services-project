import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useForgotPasswordMutation } from "../features/auth/authAPI";

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [forgotPassword, { isLoading, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await forgotPassword(values.email).unwrap();
        setSuccessMessage(res.message || "Password reset link sent to your email.");
      } catch (err) {
        console.error(err);
        setSuccessMessage("");
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your account email to receive a password reset link.
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
          </div>

          {error && (
            <p className="error">
              {error?.data?.message || "Unable to send reset email."}
            </p>
          )}

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-footer">
          Remembered your password?{' '}
          <span onClick={() => navigate('/login')}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
