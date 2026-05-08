const ServicesSection = () => {
  const services = [
    { title: "Plumbing Service", price: 499 },
    { title: "AC Repair", price: 299 },
    { title: "Home Cleaning", price: 299 },
    { title: "Electrician", price: 499 },
  ];

  return (
    <div className="services">
      <h3>Recommended Services</h3>

      <div className="service-grid">
        {services.map((s, i) => (
          <div className="card" key={i}>
           
            <h4>{s.title}</h4>
            <p>Starting at ₹{s.price}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;