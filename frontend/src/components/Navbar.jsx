import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDashboard = () => {
    if (!user?.role) return;

    switch (user.role) {
      case "customer":
        navigate("/customerdashboard");
        break;

      case "provider":
        navigate("/workerdashboard");
        break;

      case "admin":
        navigate("/admin");
        break;

      default:
        navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* LEFT */}
        <div
          className="nav-left"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.png"
            alt="logo"
            className="logo"
          />

          <h2>Skill Link</h2>
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          {!isAuthenticated ? (
            <>
              <button
                className="btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className="btn"
                onClick={handleDashboard}
              >
                Dashboard
              </button>

              <button
                className="btn logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     // localStorage.removeItem("user");
//     // localStorage.removeItem("token");
//     // setUser(null);
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleDashboard = () => {
//     if (!user?.role) return;

//     switch (user.role) {
//       case "customer":
//         navigate("/customerdashboard");
//         break;

//       case "provider":
//         navigate("/workerdashboard");
//         break;

//       case "admin":
//         navigate("/admin");
//         break;

//       default:
//         navigate("/");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="container nav-content">

//         {/* LEFT */}
//         <div className="nav-left" onClick={() => navigate("/")}>
//           <img
//             src="/logo.png"
//             alt="logo"
//             className="logo"
//           />
//           <h2>Skill Link</h2>
//         </div>

//         {/* RIGHT */}
//         <div className="nav-right">

//           {!user ? (
//             <>
//               <button className="btn" onClick={() => navigate("/login")}>
//                 Login
//               </button>

//               <button className="btn" onClick={() => navigate("/register")}>
//                 Register
//               </button>
//             </>
//           ) : (
//             <>
//               <button className="btn" onClick={handleDashboard}>
//                 Dashboard
//               </button>

//               <button className="btn logout" onClick={handleLogout}>
//                 Logout
//               </button>
//             </>
//           )}

//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// //there are changes not completed
// // components/Navbar.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="navbar">
//       <div className="container nav-content">

        
//         <div className="nav-left" onClick={() => navigate("/")}>
//           <img
//             src="../public/logo.png" 
//             alt="logo"
//             className="logo"
//           />
//           <h2>Skill Link</h2>
//         </div>

        
//         <div className="nav-right">
//           {!user ? (
//             <>
//             <button className="btn" onClick={() => navigate("/login")}>
//               Login
//             </button>
//             <button className="btn" onClick={() => navigate("/register")}>
//               Register
//             </button>
//             </>
//           ) : (
//             <>
//               <button
//                 className="btn"
//                 onClick={() => navigate("/dashboard")}
//               >
//                 Dashboard
//               </button>

//               <button
//                 className="btn logout"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;

