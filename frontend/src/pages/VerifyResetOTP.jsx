import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useVerifyPasswordResetOTPMutation } from "../features/auth/authAPI";

function VerifyResetOTP() {
  const navigate = useNavigate();
  const otpRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [verifyOTP, { isLoading, error }] = useVerifyPasswordResetOTPMutation();

  useEffect(() => {
    otpRef.current?.focus();
    const email = sessionStorage.getItem("resetEmail");
    if (!email) {
      navigate("/forgot-password");
    }
  }, [navigate]);

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
      try {
        const email = sessionStorage.getItem("resetEmail");
        const res = await verifyOTP({
          email,
          otp: values.otp,
        }).unwrap();
        setSuccessMessage(res.message || "OTP verified successfully!");
        
        setTimeout(() => {
          navigate("/reset-password");
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
        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">
          Enter the 6-digit OTP sent to your email.
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
              className="otp-input"
            />
            {formik.touched.otp && formik.errors.otp && (
              <small className="error">{formik.errors.otp}</small>
            )}
          </div>

          {error && (
            <p className="error">
              {error?.data?.message || "Failed to verify OTP."}
            </p>
          )}

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
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
