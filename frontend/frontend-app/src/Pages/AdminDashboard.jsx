import DashboardLayout from "../components/layouts/DashboardLayout";
import { useState, useMemo, useEffect } from "react";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@email.com", role: "User", status: "Active" },
    { id: 2, name: "Priya Mehta", email: "priya@email.com", role: "Analyst", status: "Pending" },
    { id: 3, name: "Amit Verma", email: "amit@email.com", role: "User", status: "Inactive" },
    { id: 4, name: "Sneha Kapoor", email: "sneha@email.com", role: "Analyst", status: "Active" },
    { id: 5, name: "Karan Singh", email: "karan@email.com", role: "User", status: "Pending" },
    { id: 6, name: "Neha Joshi", email: "neha@email.com", role: "User", status: "Active" },
  ]);

  /* Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  const badgeStyles = {
    Active: "bg-green-500/20 text-green-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
    Inactive: "bg-gray-500/20 text-gray-300",
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id]
    );
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const approveUser = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );
  };

  const deleteSelected = () => {
    setUsers((prev) =>
      prev.filter((user) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    pending: users.filter((u) => u.status === "Pending").length,
    analysts: users.filter((u) => u.role === "Analyst").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage platform users and system control
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: stats.total },
            { label: "Active Users", value: stats.active },
            { label: "Pending", value: stats.pending },
            { label: "Analysts", value: stats.analysts },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-md"
            >
              <p className="text-sm text-gray-400">{item.label}</p>
              <h3 className="text-2xl font-bold text-white mt-2">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-md">

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6">

            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-white/20 rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex gap-3 flex-wrap">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-white/20 rounded-lg bg-transparent text-white"
              >
                <option className="text-black">All</option>
                <option className="text-black">User</option>
                <option className="text-black">Analyst</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-white/20 rounded-lg bg-transparent text-white"
              >
                <option className="text-black">All</option>
                <option className="text-black">Active</option>
                <option className="text-black">Pending</option>
                <option className="text-black">Inactive</option>
              </select>

              {selectedUsers.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:opacity-90 transition"
                >
                  Delete Selected ({selectedUsers.length})
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="border-b border-white/20 text-left">
                  <th className="py-3"></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}

                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-3">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                      />
                    </td>

                    <td className="font-medium text-white">
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${badgeStyles[user.status]}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="text-right space-x-2">
                      {user.status === "Pending" && (
                        <button
                          onClick={() => approveUser(user.id)}
                          className="px-3 py-1 text-xs rounded-lg bg-green-500 text-white hover:opacity-90 transition"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="px-3 py-1 text-xs rounded-lg border border-white/20 hover:bg-white/10 transition"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm border transition ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-white/20 text-gray-300 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
