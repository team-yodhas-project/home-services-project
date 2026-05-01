
// components/Services.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const originalServices = [
  { title: "AC Repair", image: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png", slug: "ac-repair" },
  { title: "Plumbing", image: "https://cdn-icons-png.flaticon.com/512/1681/1681155.png", slug: "plumbing" },
  { title: "Cleaning", image: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png", slug: "cleaning" },
  { title: "Electrician", image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png", slug: "electrician" },
  { title: "Beauty", image: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png", slug: "beauty" },
  { title: "Carpentry", image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", slug: "carpentry" },
];

// 👇 duplicate
const services = [...originalServices, ...originalServices];

const Services = () => {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const animationRef = useRef();

  useEffect(() => {
    const scroll = () => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft += 0.5; // smooth speed

      const maxScroll =
        scrollRef.current.scrollWidth / 2;

      // 👇 reset seamlessly
      if (scrollRef.current.scrollLeft >= maxScroll) {
        scrollRef.current.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section className="services-section">
      <div className="container">

        <h2 style={{ marginBottom: "20px" }}>Popular Services</h2>

        <div
          className="services-carousel"
          ref={scrollRef}
          onMouseEnter={() => cancelAnimationFrame(animationRef.current)}
          onMouseLeave={() => {
            animationRef.current = requestAnimationFrame(function loop() {
              if (!scrollRef.current) return;
              scrollRef.current.scrollLeft += 0.5;

              const maxScroll = scrollRef.current.scrollWidth / 2;
              if (scrollRef.current.scrollLeft >= maxScroll) {
                scrollRef.current.scrollLeft = 0;
              }

              animationRef.current = requestAnimationFrame(loop);
            });
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card"
              onClick={() => navigate(`/services/${service.slug}`)}
            >
              <img src={service.image} alt={service.title} />
              <h4>{service.title}</h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;