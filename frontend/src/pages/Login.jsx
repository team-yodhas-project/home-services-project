
import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { useLoginUserMutation } from "../features/auth/authApi";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  function handleChange(ev) {
    if (ev.key === "Enter") {
      ref2.current.focus();
    }
  }

  // RTK QUERY HOOK
  const [loginUser, { isLoading, error }] =
    useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await loginUser(values).unwrap();

        // save token
        localStorage.setItem("token", res.token);

        // navigate based on role
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

        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle">
          Login to your account
        </p>

        <form onSubmit={formik.handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Enter your email"
              ref={ref1}
            />
          </div>

          <div className="input-group password-box">

            <label>Password</label>

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Enter your password"
              ref={ref2}
              onKeyUp={handleChange}
            />

            <span
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </span>

          </div>

          {error && (
            <p className="error">
              {error?.data?.message ||
               error?.data?.msg}
            </p>
          )}

          <button
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don’t have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>

        </div>

      </div>
    </div>
  );
}

export default Login;