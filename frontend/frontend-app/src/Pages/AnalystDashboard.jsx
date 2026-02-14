import DashboardLayout from "../components/layouts/DashboardLayout"

const AnalystDashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Analyst Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Searches Performed</p>
          <h3 className="text-2xl font-bold mt-2">86</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Reports Generated</p>
          <h3 className="text-2xl font-bold mt-2">14</h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Alerts</p>
          <h3 className="text-2xl font-bold mt-2">6</h3>
        </div>
      </div>

      {/* Recent Search Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Search Activity</h3>

        <ul className="space-y-3 text-sm">
          <li className="border-b dark:border-gray-700 pb-2">
            AI-based medical patents in US (2023)
          </li>
          <li className="border-b dark:border-gray-700 pb-2">
            Electric vehicle battery filings in Germany
          </li>
          <li>
            Semiconductor fabrication technologies – Japan
          </li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default AnalystDashboard;
