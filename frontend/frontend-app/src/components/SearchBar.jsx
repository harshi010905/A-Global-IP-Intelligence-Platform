const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patents, trademarks, companies..."
          className="flex-1 px-5 py-3 bg-transparent border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
