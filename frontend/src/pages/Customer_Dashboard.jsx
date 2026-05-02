import { useSelector } from "react-redux";

const Customer_Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return <h2>Customer Dashboard - {user?.name}</h2>;
};
export default Customer_Dashboard;