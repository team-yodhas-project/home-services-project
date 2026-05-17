import { useMemo, useState } from "react";
import { useGetAdminServicesQuery } from "../features/admin/adminAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/admin/AdminTables.css";

const PAGE_SIZE = 10;

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: services, isLoading, isError, error } = useGetAdminServicesQuery();

  const filteredServices = useMemo(() => {
    if (!services) return [];
    const search = searchTerm.toLowerCase();
    return services.filter((service) => {
      return (
        service?.title?.toLowerCase().includes(search) ||
        service?.category?.toLowerCase().includes(search) ||
        service?.provider?.name?.toLowerCase().includes(search) ||
        service?.providerName?.toLowerCase().includes(search)
      );
    });
  }, [services, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / PAGE_SIZE));
  const visibleServices = filteredServices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="admin-page">
      <div className="admin-page__header-panel">
        <div>
          <h3 className="admin-page__title">Services</h3>
          <p className="admin-page__subtitle">Review service catalog, providers, and pricing.</p>
        </div>
        <div className="admin-page__controls">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search services by title, category, or provider"
            className="admin-page__search"
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="admin-card admin-card__meta" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#991b1b" }}>
          {error?.data?.message || "Unable to load services."}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {visibleServices.length === 0 ? (
                <tr>
                  <td colSpan="4" className="admin-table__empty">
                    No services match your search criteria.
                  </td>
                </tr>
              ) : (
                visibleServices.map((service) => (
                  <tr key={service._id || service.title}>
                    <td>{service.title || service.name || "Untitled"}</td>
                    <td>{service.category || "—"}</td>
                    <td>{service.providerId?.name || service.providerName || "—"}</td>
                    <td>${service.price }</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="admin-table-footer">
            <p className="admin-table-footer__text">
              Showing {visibleServices.length} of {filteredServices.length} services
            </p>
            <div className="admin-table-footer__controls">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="admin-table__button"
              >
                Previous
              </button>
              <span className="admin-table-footer__text">
                Page {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="admin-table__button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminServices;
