// components/Hero.jsx
import React from "react";
import Navbar from "../../components/Navbar";
import Services from "../../components/Services";
import InfoSection from "./InfoSection";
import Footer from "../../components/Footer";

const Home = () => {
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
              onClick={() => navigate("/services")}
            >
              Browse Services
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