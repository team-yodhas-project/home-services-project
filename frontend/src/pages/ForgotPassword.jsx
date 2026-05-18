import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSendPasswordResetOTPMutation } from "../features/auth/authAPI";

function ForgotPassword() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [sendOTP, { isLoading, error }] = useSendPasswordResetOTPMutation();
  console.log(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await sendOTP(values.email).unwrap();
        setSuccessMessage(res.message || "OTP sent to your email.");
        sessionStorage.setItem("resetEmail", values.email);
        setTimeout(() => {
          navigate("/verify-reset-otp");
        }, 1200);
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
          Enter your email to receive an OTP for password reset.
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
              onBlur={formik.handleBlur}
              ref={emailRef}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="error">{formik.errors.email}</small>
            )}
          </div>

          {error && (
            <p className="error">
              {error?.data?.message || "Unable to send OTP."}
            </p>
          )}

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Send OTP"}
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
