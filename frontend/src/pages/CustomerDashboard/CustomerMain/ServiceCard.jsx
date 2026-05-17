const ServiceCard = ({ service, onBook, onReviews }) => {
  return (
    <div className="service-card-modern">
      {/* TOP */}
      <div className="service-card-top">
        <div>
          <h2>{service.title}</h2>

          <p className="provider">
            {service.providerId?.name} • {service.providerId?.experience || 0} yrs exp
          </p>
        </div>

        <span className="category-badge">
          {service.category}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="description">
        {service.description}
      </p>

      {/* FOOTER INFO */}
      <div className="service-meta">
        <div className="price">
          ₹{service.price}
        </div>

        {/* <div className="rating">
          ⭐ {service.averageRating?.toFixed(1) || 0}
          <span>({service.numberOfReviews || 0})</span>
        </div> */}

        <div className="rating">
        {service.numberOfReviews > 0 ? (
            <>
            ⭐ {service.averageRating?.toFixed(1)}
            <span>({service.numberOfReviews})</span>
            </>
        ) : (
            <span className="no-reviews">No reviews yet</span>
        )}
</div>
      </div>

      {/* ACTIONS */}
      <div className="card-actions">
        <button
          className="book-btn"
          onClick={() => onBook(service)}
        >
          Book Now
        </button>

        <button
          className="review-btn"
          onClick={() => onReviews(service)}
        >
          Reviews
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

