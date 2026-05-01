
// components/Services.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const originalServices = [
  { title: "AC Repair", image: "https://www.shutterstock.com/image-photo/mechanic-performing-routine-maintenance-on-600nw-2610644631.jpg", slug: "ac-repair" },
  { title: "Plumbing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nEXsInv_xclZJ32d2r7140ZB64HNBdow0A&s", slug: "plumbing" },
  { title: "Cleaning", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJG7bzcigLIbXkiOEWoQd96mzpBNK7WNKzNQ&s", slug: "cleaning" },
  { title: "Electrician", image: "https://5.imimg.com/data5/SELLER/Default/2024/6/429178565/EC/FF/DY/76226430/electrician-services.jpeg", slug: "electrician" },
  { title: "Beauty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-OxYt754Kehz5uf7SvUPN0ZPeYTA0OicZQ&s", slug: "beauty" },
  { title: "Carpentry", image: "https://4.imimg.com/data4/IC/NB/MY-6140026/carpenter-services-500x500.jpg", slug: "carpentry" },
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