import { useEffect, useMemo, useState } from "react";
import { useGetAdminUsersQuery } from "../features/admin/adminAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/admin/AdminTables.css";

const PAGE_SIZE = 10;

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading, isError, error } = useGetAdminUsersQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const search = searchTerm.toLowerCase();
    return users.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(search) ||
        user?.email?.toLowerCase().includes(search) ||
        user?.role?.toLowerCase().includes(search)
      );
    });
  }, [users, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="admin-page">
      <div className="admin-page__header-panel">
        <div>
          <h3 className="admin-page__title">Users</h3>
          <p className="admin-page__subtitle">Manage registered users and review their roles.</p>
        </div>
        <div className="admin-page__controls">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name, email or role"
            className="admin-page__search"
          />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && (
        <div className="admin-card admin-card__meta" style={{ borderColor: "#fecaca", background: "#fef2f2", color: "#991b1b" }}>
          {error?.data?.message || "Unable to load users."}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="admin-table__empty">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user._id || user.email}>
                    <td>{user.name || "Unknown"}</td>
                    <td>{user.email || "—"}</td>
                    <td className="capitalize">{user.role || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="admin-table-footer">
            <p className="admin-table-footer__text">
              Showing {paginatedUsers.length} of {filteredUsers.length} users
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

export default AdminUsers;
