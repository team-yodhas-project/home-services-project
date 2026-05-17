
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ServicesSection from "./Services";
import BookingPanel from "./BookingPanel";
import "./customerdashboard.css";

const CustomerLayout = () => {
 const user = JSON.parse(localStorage.getItem("user"));



  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Header name={user?.name} />

        <div className="content-area">
          <ServicesSection />
          <BookingPanel />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
