import { useGetAdminStatsQuery } from "../features/admin/adminAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/admin/AdminTables.css";

const AdminBookings = () => {
  const { data, isLoading, isError, error } = useGetAdminStatsQuery();
  const recentBookings = data?.stats?.recentBookings || data?.recentBookings || [];
  console.log(recentBookings);

  return (
    <section className="admin-page">
      <div className="admin-page__header-panel admin-page__header-panel--compact">
        <div>
          <h3 className="admin-page__title">Bookings</h3>
          <p className="admin-page__subtitle">Review all recent bookings and monitor status updates.</p>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="admin-card admin-card__meta" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#991b1b" }}>
          {error?.data?.message || "Unable to load bookings."}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Provider</th>
                <th>Service</th>
                <th>Status</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="admin-table__empty">
                    No recent bookings available.
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking, index) => (
                  <tr key={`${booking.customer}-${booking.bookingDate}-${index}`}>
                    <td>{booking.customerId.name ||  "Unknown"}</td>
                    <td>{booking.providerId.name || "Unknown"}</td>
                    <td>{booking.serviceId.title ||"—"}</td>
                    <td className="capitalize">{booking.status || "Pending"}</td>
                    <td>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminBookings;
