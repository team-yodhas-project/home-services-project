import "../styles/auth.css";
import { useState } from "react";
import { useChangePasswordMutation } from "../features/auth/authAPI";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await changePassword({
        id: user._id,
        oldPassword,
        newPassword,
        confirmNewPassword,
      }).unwrap();

      alert(res.message || "Password updated successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      alert(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">Change Password</h2>
        <p className="auth-subtitle">Update your credentials securely</p>

        <form onSubmit={handleSubmit}>

          {/* OLD PASSWORD */}
          <div className="input-group password-box">
            <label>Current Password</label>
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              className="password-toggle-inside"
              onClick={() => setShowOld((p) => !p)}
            >
              {showOld ? "Hide" : "Show"}
            </span>
          </div>

          {/* NEW PASSWORD */}
          <div className="input-group password-box">
            <label>New Password</label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="password-toggle-inside"
              onClick={() => setShowNew((p) => !p)}
            >
              {showNew ? "Hide" : "Show"}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="input-group password-box">
            <label>Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <span
              className="password-toggle-inside"
              onClick={() => setShowConfirm((p) => !p)}
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

