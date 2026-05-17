
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import "./customerdashboard.css";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
 const user = JSON.parse(localStorage.getItem("user"));

    return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;
