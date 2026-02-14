import DashboardLayout from "../components/layouts/DashboardLayout"

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          Total Searches: 24
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Saved Patents: 12
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          Active Alerts: 5
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
