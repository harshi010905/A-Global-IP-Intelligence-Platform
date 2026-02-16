import { useAuth } from "../../context/AuthContext";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 h-16 backdrop-blur-lg bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">

      {/* Search */}
      <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg w-72">
        <Search size={16} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search patents, trademarks..."
          className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <Bell className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition" size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
              {user?.name?.charAt(0)}
            </div>
            <ChevronDown size={16} />
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">
                {user?.name}
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Topbar;
