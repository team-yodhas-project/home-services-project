// components/Hero.jsx
import React from "react";
import Navbar from "../../components/Navbar";
import Services from "./Services";
import InfoSection from "./InfoSection";
import Footer from "../../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  const handleBrowse = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return;
  }

  switch (user.role) {
    case "customer":
      navigate("/customerdashboard");
      break;

    case "provider":
      navigate("/workerdashboard");
      break;

    case "admin":
      navigate("/admindashboard");
      break;

    default:
      navigate("/");
  }
};
  return (
    <>
    <Navbar></Navbar>
    <section className="hero">
        <div className="container hero-content">

          <div className="hero-text">
            <h1>Find Trusted Home Services Near You</h1>

            <p>
              Book verified professionals for your home needs in just a few clicks.
            </p>

            <button
              className="btn hero-btn"
              onClick={handleBrowse}
            >
              Get Started
            </button>
          </div>

       
          <img
            src="https://img.freepik.com/free-photo/smiling-plumber-holding-wrench_23-2148761522.jpg"
            alt="worker"
            className="hero-img"
          />
        </div>
      </section>
<br></br>

  <Services />
  <InfoSection></InfoSection>
  <Footer></Footer>
    </>
  );
};

export default Home;