const DashboardHeader = ({ user }) => {
  return (
    <div className="dashboard-header-card">
      <div className="dashboard-header-left">

        <h1>
          Welcome back, <span>{user?.name}</span> 
        </h1>

        <p className="header-desc">
          Find trusted professionals near you and book services in minutes.
        </p>
      </div>

    </div>
  );
};

export default DashboardHeader;

