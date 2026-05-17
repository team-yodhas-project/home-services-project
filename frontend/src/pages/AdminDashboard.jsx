import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useGetAdminStatsQuery } from "../features/admin/adminAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/admin/AdminDashboard.css";
import "../styles/admin/AdminCards.css";
import "../styles/admin/AdminCharts.css";
import "../styles/admin/AdminTables.css";

const statusColors = ["#0ea5e9", "#22c55e", "#f97316", "#ef4444", "#a855f7", "#facc15"];

const AdminDashboard = () => {
  const { data, isLoading, isError, error } = useGetAdminStatsQuery();
  const stats = data?.stats ?? data ?? {};

  const {
    totalUsers = 0,
    totalProviders = 0,
    totalCustomers = 0,
    totalServices = 0,
    totalBookings = 0,
    completedBookings = 0,
    pendingBookings = 0,
    cancelledBookings = 0,
    rejectedBookings = 0,
    averageRating = 0,
    todaysBookings = 0,
    bookingStatusStats = [],
    monthlyBookings = [],
    topProviders = [],
    popularServices = [],
    recentBookings = [],
  } = stats;

            const formattedBookingStatusStats = bookingStatusStats.map((item) => ({
        name: item._id,
        value: item.count,
        }));
  console.log(recentBookings);
  const statsCards = [
    { label: "Total Users", value: totalUsers },
    { label: "Total Providers", value: totalProviders },
    { label: "Total Customers", value: totalCustomers },
    { label: "Total Services", value: totalServices },
    { label: "Total Bookings", value: totalBookings },
    { label: "Completed Bookings", value: completedBookings },
    { label: "Pending Bookings", value: pendingBookings },
    { label: "Cancelled Bookings", value: cancelledBookings },
    { label: "Rejected Bookings", value: rejectedBookings },
    { label: "Average Ratings", value: averageRating },
    { label: "Today's Bookings", value: todaysBookings },
  ];

        const monthNames = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        ];

        const lineData = monthlyBookings.map((item) => ({
        month: monthNames[item._id],
        bookings: item.total,
        }));
  return (
    <section className="admin-dashboard">
      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="admin-card admin-card__meta" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#991b1b" }}>
          {error?.data?.message || "Unable to load dashboard statistics."}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="admin-dashboard__stats-grid">
            {statsCards.map((card) => (
              <article key={card.label} className="admin-card">
                <p className="admin-card__label">{card.label}</p>
                <p className="admin-card__value">{card.value}</p>
              </article>
            ))}
          </div>

          <div className="admin-dashboard__charts-grid">
            <section className="admin-chart">
              <div className="admin-chart__header">
                <div>
                  <h3 className="admin-chart__title">Booking Status</h3>
                  <p className="admin-chart__subtitle">See the current booking distribution.</p>
                </div>
              </div>
              <div className="admin-chart__body">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedBookingStatusStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                    >
                      {formattedBookingStatusStats.map((entry, index) => (
                        <Cell key={entry.name} fill={
                                entry.name==="completed"? "#22c55e":
                                entry.name==="pending"?"#facc15":
                                entry.name==="cancelled"?"#ef4444":
                                entry.name==="rejected"?"#7c3aed":
                                "#0ea5e9"
                        } />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="admin-chart">
              <div className="admin-chart__header">
                <div>
                  <h3 className="admin-chart__title">Monthly Bookings</h3>
                  <p className="admin-chart__subtitle">Track bookings through the year.</p>
                </div>
              </div>
              <div className="admin-chart__body">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bookings" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <div className="admin-dashboard__promo-grid">
            <section className="admin-dashboard__section">
              <div className="admin-dashboard__section-header">
                <div>
                  <h3 className="admin-dashboard__section-title">Top Providers</h3>
                  <p className="admin-dashboard__section-subtitle">Best performing providers this month.</p>
                </div>
              </div>
              <div>
                {topProviders.length === 0 ? (
                  <p className="admin-card__meta">No provider analytics available yet.</p>
                ) : (
                  topProviders.map((provider) => (
                    <div key={provider.email || provider.name} className="admin-card" style={{ marginBottom: "16px", background: "#f8fafc" }}>
                      <h4 className="admin-card__value" style={{ fontSize: "1.1rem" }}>{provider.providerName || "Unknown"}</h4>
                      <p className="admin-card__meta">{provider.providerEmail}</p>
                      <p className="admin-card__meta">Completed jobs: {provider.completedJobs ?? 0}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="admin-dashboard__section">
              <div className="admin-dashboard__section-header">
                <div>
                  <h3 className="admin-dashboard__section-title">Popular Services</h3>
                  <p className="admin-dashboard__section-subtitle">Most requested services right now.</p>
                </div>
              </div>
              <div>
                {popularServices.length === 0 ? (
                  <p className="admin-card__meta">No popular service data found.</p>
                ) : (
                  popularServices.map((service) => (
                    <div key={service.title} className="admin-card" style={{ marginBottom: "16px", background: "#f8fafc" }}>
                      <h4 className="admin-card__value" style={{ fontSize: "1.05rem" }}>{service.serviceTitle}</h4>
                      <p className="admin-card__meta">Price: ${service.servicePrice ??  0}</p>
                      <p className="admin-card__meta">Total bookings: {service.totalBookings ?? service.bookings ?? 0}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          <section className="admin-dashboard__section">
            <div className="admin-dashboard__section-header">
              <div>
                <h3 className="admin-dashboard__section-title">Recent Bookings</h3>
                <p className="admin-dashboard__section-subtitle">Recent customer booking activity and service progress.</p>
              </div>
            </div>
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
                        No bookings found.
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking, index) => (
                      <tr key={`${booking.customer}-${booking.bookingDate}-${index}`}>
                        <td>{booking.customerId.name || "Unknown"}</td>
                        <td>{booking.providerId.name || "Unknown"}</td>
                        <td>{booking.serviceId.title || "-"}</td>
                        <td>
                          <span className={`admin-table__status admin-table__status--${(booking.status || "pending").toLowerCase()}`}>
                            {booking.status || "Pending"}
                          </span>
                        </td>
                        <td>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "—"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default AdminDashboard;
