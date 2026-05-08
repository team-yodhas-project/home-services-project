import "../styles/auth.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useLoginUserMutation } from "../features/auth/authAPI";
import { useGetProfileQuery } from "../features/auth/authAPI";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loginUser, { isLoading, error }] =
    useLoginUserMutation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await loginUser(values).unwrap();


        // store token
        localStorage.setItem("token", res.token);
        localStorage.setItem("user",res.name);


       

        // role-based routing
        const role = res.role;

        if (role === "customer") {
          navigate("/customerdashboard");
        } else if (role === "provider") {
          navigate("/workerdashboard");
        } else {
          navigate("/");
        }

      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      passwordRef.current?.focus();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={formik.handleSubmit}>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>

            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              ref={emailRef}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group password-box">
            <label>Password</label>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              ref={passwordRef}
            />

            <span
              className="password-toggle-inside"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="error">
              {error?.data?.message ||
                error?.data?.msg ||
                "Login failed. Please try again."}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="auth-footer">
          Don’t have an account?

          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;