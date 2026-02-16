import DashboardLayout from "../components/layouts/DashboardLayout";

const AnalystDashboard = () => {
  const stats = [
    { label: "Searches Performed", value: 86 },
    { label: "Reports Generated", value: 14 },
    { label: "Active Alerts", value: 6 },
  ];

  const recentSearches = [
    "AI-based medical patents in US (2023)",
    "Electric vehicle battery filings in Germany",
    "Semiconductor fabrication technologies – Japan",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Analyst Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Monitor your research activity and generated insights
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-md hover:bg-white/15 transition"
            >
              <p className="text-sm text-gray-400">
                {item.label}
              </p>
              <h3 className="text-2xl font-bold text-white mt-2">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Recent Search Activity
            </h3>

            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
              View All
            </button>
          </div>

          <ul className="space-y-4">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="border-b border-white/10 pb-3 text-sm text-gray-300 hover:text-white transition"
              >
                {search}
              </li>
            ))}
          </ul>
        </div>

        

      </div>
    </DashboardLayout>
  );
};

export default AnalystDashboard;
