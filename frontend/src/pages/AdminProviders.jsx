import { useMemo, useState } from "react";
import { useGetAdminProvidersQuery } from "../features/admin/adminAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/admin/AdminTables.css";

const PAGE_SIZE = 10;

const AdminProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: providers, isLoading, isError, error } = useGetAdminProvidersQuery();

  const filteredProviders = useMemo(() => {
    if (!providers) return [];
    const search = searchTerm.toLowerCase();
    return providers.filter((provider) => {
      return (
        provider?.name?.toLowerCase().includes(search) ||
        provider?.email?.toLowerCase().includes(search) ||
        provider?.phone?.toLowerCase().includes(search)
      );
    });
  }, [providers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProviders.length / PAGE_SIZE));
  const visibleProviders = filteredProviders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="admin-page">
      <div className="admin-page__header-panel">
        <div>
          <h3 className="admin-page__title">Providers</h3>
          <p className="admin-page__subtitle">Browse providers with contact details and account status.</p>
        </div>
        <div className="admin-page__controls">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search providers by name, email or phone"
            className="admin-page__search"
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="admin-card admin-card__meta" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#991b1b" }}>
          {error?.data?.message || "Unable to load providers."}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {visibleProviders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="admin-table__empty">
                    No providers matched your search.
                  </td>
                </tr>
              ) : (
                visibleProviders.map((provider) => (
                  <tr key={provider._id || provider.email}>
                    <td>{provider.name || "Unknown"}</td>
                    <td>{provider.email || "—"}</td>
                    <td>{provider.phone || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="admin-table-footer">
            <p className="admin-table-footer__text">
              Showing {visibleProviders.length} of {filteredProviders.length} providers
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

export default AdminProviders;
