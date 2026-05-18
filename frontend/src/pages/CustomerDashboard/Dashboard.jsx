import { useState } from "react";
import ReviewsModal from "./CustomerMain/ReviewModal";
import { useGetServicesQuery } from "../../features/services/serviceAPI";
import DashboardHeader from "./CustomerMain/DashboardHeader";
import SearchBar from "./CustomerMain/SearchBar";
import ServiceGrid from "./CustomerMain/ServiceGrid";
import BookingModal from "./CustomerMain/BookingModel";
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [keywordInput, setKeywordInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const [selectedService, setSelectedService] = useState(null);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  
  const {
    data: services = [],
    isLoading,
    error,
  } = useGetServicesQuery({
    keyword,
    address: location,
  });

  const handleSearch = () => {
    setKeyword(keywordInput);
    setLocation(locationInput);
  };

  const handleBook = (service) => {
    setSelectedService(service);
    setBookingOpen(true);
  };

  const handleReviews = (service) => {
    setSelectedService(service);
    setReviewsOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardHeader user={user} />

      <SearchBar
        keyword={keywordInput}
        setKeyword={setKeywordInput}
        location={locationInput}
        setLocation={setLocationInput}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p>Failed to load services.</p>
      ) : (
        <ServiceGrid
          services={services}
          onBook={handleBook}
          onReviews={handleReviews}
        />
      )}

      {bookingOpen && selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setBookingOpen(false)}
        />
      )}

      {reviewsOpen && selectedService && (
        <ReviewsModal
          service={selectedService}
          onClose={() => setReviewsOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;