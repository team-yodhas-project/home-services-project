import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-layout__inner">
        <AdminSidebar />
        <main className="admin-layout__panel">
          <div className="admin-layout__panel-card">
            <div className="admin-layout__header">
              <div>
                <p className="admin-layout__title-label">Admin Dashboard</p>
                <h2 className="admin-layout__title">Welcome back, Admin</h2>
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
