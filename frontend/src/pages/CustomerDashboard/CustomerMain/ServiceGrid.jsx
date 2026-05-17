import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services, onBook, onReviews }) => {
  if (!services?.length) {
    return (
      <div className="service-empty-state">
        <div className="empty-box">
          No services found
        </div>
      </div>
    );
  }

  return (
    <div className="service-grid-wrapper">
      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onBook={onBook}
            onReviews={onReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;

