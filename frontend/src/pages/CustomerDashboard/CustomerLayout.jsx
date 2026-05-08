
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ServicesSection from "./Services";
import BookingPanel from "./BookingPanel";
import "./customerdashboard.css";

const CustomerLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Header user={user} />

        <div className="content-area">
          <ServicesSection />
          <BookingPanel />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
