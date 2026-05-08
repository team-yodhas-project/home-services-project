import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Services</h3>
          <p>--</p>
        </div>

        <div className="card">
          <h3>Bookings</h3>
          <p>--</p>
        </div>

        <div className="card">
          <h3>Earnings</h3>
          <p>₹0</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;