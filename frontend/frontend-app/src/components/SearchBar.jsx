const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search patents, trademarks..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
    />
  );
};

export default SearchBar;