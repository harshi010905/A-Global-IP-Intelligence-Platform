import { useAuth } from "../../context/AuthContext";
import { Bell, Search, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.username) return "U";
    return user.username
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="sticky top-0 z-40 h-16 backdrop-blur-lg bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">

      {/* Search */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg w-72">
        <Search size={16} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search patents, trademarks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm w-full text-gray-700 dark:text-gray-200"
        />
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-6 ml-auto">

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
              {getUserInitials()}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role?.toLowerCase()}
              </p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <User size={14} />
                Profile
              </button>
              
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
              >
                <LogOut size={14} />
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