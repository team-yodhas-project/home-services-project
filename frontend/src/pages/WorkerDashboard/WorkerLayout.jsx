// import { useSelector } from "react-redux";

// const WorkerLayout = () => {
//   const { user } = useSelector((state) => state.auth);

//   return <h2>Worker_Dashboard - {user?.name}</h2>;
// };

// export default WorkerLayout;

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