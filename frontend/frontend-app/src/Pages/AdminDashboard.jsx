import DashboardLayout from "../components/layouts/DashboardLayout"
const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <h3 className="text-2xl font-bold mt-2">120</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Analysts</p>
          <h3 className="text-2xl font-bold mt-2">15</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total IP Records</p>
          <h3 className="text-2xl font-bold mt-2">1,240,000</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">System Alerts</p>
          <h3 className="text-2xl font-bold mt-2">8</h3>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Users</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Rahul Sharma</td>
              <td>rahul@email.com</td>
              <td>User</td>
              <td className="text-green-600">Active</td>
            </tr>

            <tr className="border-b dark:border-gray-700">
              <td className="py-2">Priya Mehta</td>
              <td>priya@email.com</td>
              <td>Analyst</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
