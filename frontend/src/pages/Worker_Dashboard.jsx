import { useSelector } from "react-redux";

const Worker_Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return <h2>Worker_Dashboard - {user?.name}</h2>;
};

export default Worker_Dashboard;