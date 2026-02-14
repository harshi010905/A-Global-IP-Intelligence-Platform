import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Search, Bell, BarChart3, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const menu = [
    { name: "Dashboard", path: `/${user?.role}-dashboard`, icon: <LayoutDashboard size={18} /> },
    { name: "Search", path: "/search", icon: <Search size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
    { name: "Alerts", path: "/alerts", icon: <Bell size={18} /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col">
      
      <h2 className="text-xl font-bold mb-8 text-blue-600">
        IP Intelligence
      </h2>

      <nav className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition 
              ${location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 mt-6"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
