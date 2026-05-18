import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useResetPasswordMutation } from "../features/auth/authAPI";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [resetPassword, { isLoading, error }] =
    useResetPasswordMutation();

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
      try {
        const res = await resetPassword({
          token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        setSuccessMessage(res.message || "Password reset successfully.");
        formik.resetForm();
      } catch (err) {
        console.error(err);
        setSuccessMessage("");
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Set a new password for your account.
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

          {error && (
            <p className="error">
              {error?.data?.message || "Unable to reset password."}
            </p>
          )}

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : "Reset Password"}
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

export default ResetPassword;
