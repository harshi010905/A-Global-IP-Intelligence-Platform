const FiltersPanel = ({ filters, setFilters }) => {
  return (
    <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold mb-6 text-white">
        Filters
      </h3>

      {/* IP Type */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-400">
          IP Type
        </label>

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
          className="w-full bg-[#1E293B] border border-white/20 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">All</option>
          <option value="Patent">Patent</option>
          <option value="Trademark">Trademark</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-gray-400">
          Status
        </label>

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="w-full bg-[#1E293B] border border-white/20 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">All</option>
          <option value="Granted">Granted</option>
          <option value="Pending">Pending</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm mb-2 text-gray-400">
          Country
        </label>

        <input
          type="text"
          value={filters.country}
          onChange={(e) =>
            setFilters({ ...filters, country: e.target.value })
          }
          placeholder="e.g. India"
          className="w-full bg-[#1E293B] border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FiltersPanel;
