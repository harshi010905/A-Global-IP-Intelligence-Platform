import { useNavigate } from "react-router-dom";

const ResultsTable = ({ results }) => {
  const navigate = useNavigate();
   if (!results.length) {
    return <p className="text-gray-500">No results found.</p>;
  }

  const dummyResults = [
    {
      id: 1,
      title: "AI-based Medical Imaging System",
      type: "Patent",
      applicant: "MedTech Corp",
      country: "US",
      status: "Granted",
      date: "2022-05-10",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="text-left border-b border-white/10 text-gray-400">
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Applicant</th>
            <th className="p-2">Country</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyResults.map((item) => (
            <tr
              key={item.id}
              className="border-b border-white/10 hover:bg-white/5 cursor-pointer transition"
              onClick={() => navigate(`/ip/${item.id}`)}
            >
              <td className="p-3 text-indigo-400">{item.title}</td>
              <td className="p-2">{item.type}</td>
              <td className="p-2">{item.applicant}</td>
              <td className="p-2">{item.country}</td>
              <td className="p-2">{item.status}</td>
              <td className="p-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
