import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FiltersPanel from "../components/FiltersPanel";
import ResultsTable from "../components/ResultsTable";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    country: "",
  });
  const [results, setResults] = useState([]);

  const dummyData = [
    {
      id: 1,
      title: "AI-based Medical Imaging System",
      type: "Patent",
      applicant: "MedTech Corp",
      country: "US",
      status: "Granted",
      date: "2022-05-10",
    },
    {
      id: 2,
      title: "Smart Agriculture Device",
      type: "Patent",
      applicant: "AgroTech",
      country: "India",
      status: "Pending",
      date: "2023-01-15",
    },
  ];

  useEffect(() => {
    let filtered = dummyData;

    if (query) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    if (filters.status) {
      filtered = filtered.filter((item) => item.status === filters.status);
    }

    if (filters.country) {
      filtered = filtered.filter((item) =>
        item.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    setResults(filtered);
  }, [query, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#020617] text-white p-10">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Global IP Search
        </h1>
        <p className="text-gray-400 mt-3">
          Search and analyze patents, trademarks, and designs worldwide.
        </p>
      </div>

      <SearchBar query={query} setQuery={setQuery} />

      <div className="grid grid-cols-4 gap-8 mt-8">

        {/* Filters Panel */}
        <div className="col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <FiltersPanel filters={filters} setFilters={setFilters} />
        </div>

        {/* Results Section */}
        <div className="col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <ResultsTable results={results} />
        </div>

      </div>
    </div>
  );
};

export default Search;
