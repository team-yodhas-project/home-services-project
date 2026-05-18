import "../styles/auth.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function VerifyResetOTP() {
  const navigate = useNavigate();
  const otpRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    otpRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.otp.trim()) {
        errors.otp = "OTP is required";
      } else if (!/^\d{6}$/.test(values.otp)) {
        errors.otp = "OTP must be 6 digits";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const res = await axios.post(
          `${API_URL}/api/auth/verify-reset-otp`,
          { otp: values.otp },
          { withCredentials: true }
        );

        setSuccessMessage(res.data.message || "OTP verified successfully.");
        setTimeout(() => navigate("/reset-password"), 1200);
      } catch (err) {
        setErrorMessage(
          err?.response?.data?.message || "Unable to verify OTP."
        );
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">
          Enter the 6-digit OTP sent to your email or phone.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>OTP Code</label>
            <input
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={formik.values.otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                formik.setFieldValue("otp", value);
              }}
              onBlur={formik.handleBlur}
              maxLength="6"
              ref={otpRef}
            />
            {formik.touched.otp && formik.errors.otp && (
              <small className="error">{formik.errors.otp}</small>
            )}
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="auth-btn">
            Verify OTP
          </button>
        </form>

        <div className="auth-footer">
          Didn’t receive it?{' '}
          <span onClick={() => navigate('/forgot-password')}>Try again</span>
        </div>
      </div>
    </div>
  );
}

export default VerifyResetOTP;
