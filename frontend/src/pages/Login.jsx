import "../styles/auth.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const res = await dispatch(loginUser(values));

      if (res.meta.requestStatus === "fulfilled") {
        const role = res.payload.role;

        if (role === "customer") navigate("/customerdashboard");
        else navigate("/workerdashboard");
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={formik.handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group password-box">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
        </div>

      </div>
    </div>
  );
}

export default Login;