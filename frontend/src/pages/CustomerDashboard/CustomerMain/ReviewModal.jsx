import { useGetServiceReviewsQuery } from "../../../features/reviews/reviewAPI.js";

const ReviewsModal = ({ service, onClose }) => {
  const { data, isLoading } = useGetServiceReviewsQuery(service._id);

  const reviews = data?.reviews || [];

  return (
    <div className="modal-overlay">
      <div className="reviews-modal">

        {/* HEADER */}
        <div className="modal-header">
          <div>
            <h2>Customer Reviews</h2>
            <p>{service.title}</p>
          </div>

          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        {/* CONTENT (scroll ONLY here) */}
        <div className="reviews-body">

          {isLoading ? (
            <p className="muted-text">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="empty-reviews">
              <p>No reviews yet</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">

                  <div className="review-top">
                    <h3>{review.userId?.name}</h3>

                    <span className="rating">
                      ⭐ {review.rating}
                    </span>
                  </div>

                  <p className="comment">
                    {review.comment}
                  </p>

                  {review.images?.length > 0 && (
                    <div className="review-images">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000${img}`}
                          alt="review"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;


