

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./worker.css";
import Hero from "./Hero"
import "./worker.css"

const WorkerLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default WorkerLayout;