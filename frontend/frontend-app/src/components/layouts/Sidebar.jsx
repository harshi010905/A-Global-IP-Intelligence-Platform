import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Search,
  Bell,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
  FileText,
  Activity
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const { logout, user, hasRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Menu items based on role
  const getMenuItems = () => {
    const items = [
      { 
        name: "Dashboard", 
        path: `/${user?.role?.toLowerCase()}-dashboard`, 
        icon: LayoutDashboard,
        roles: ['USER', 'ANALYST', 'ADMIN']
      },
      { 
        name: "Search", 
        path: "/search", 
        icon: Search,
        roles: ['USER', 'ANALYST', 'ADMIN']
      },
      { 
        name: "Alerts", 
        path: "/alerts", 
        icon: Bell,
        roles: ['USER', 'ANALYST', 'ADMIN']
      },
    ];

    // Analyst and Admin get Analytics
    if (hasRole('ANALYST')) {
      items.push({ 
        name: "Analytics", 
        path: "/analytics", 
        icon: BarChart3,
        roles: ['ANALYST', 'ADMIN']
      });
    }

    // Admin only items
    if (hasRole('ADMIN')) {
      items.push(
        { 
          name: "User Management", 
          path: "/admin/users", 
          icon: Users,
          roles: ['ADMIN']
        },
        { 
          name: "System Logs", 
          path: "/admin/logs", 
          icon: FileText,
          roles: ['ADMIN']
        },
        { 
          name: "Activity", 
          path: "/admin/activity", 
          icon: Activity,
          roles: ['ADMIN']
        }
      );
    }

    return items;
  };

  const menu = getMenuItems();

  // Get role display name
  const getRoleDisplay = () => {
    const roleMap = {
      'ADMIN': 'Administrator',
      'ANALYST': 'Data Analyst',
      'USER': 'Regular User'
    };
    return roleMap[user?.role] || user?.role;
  };

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col`}
    >
      {/* Logo + Collapse */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h2 className="text-xl font-bold text-blue-600">
            IP Intelligence
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* User Info & Role Badge */}
      {!collapsed && user && (
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.username}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {user.email}
          </p>
          <div className="mt-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
              {getRoleDisplay()}
            </span>
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
            >
              <Icon size={18} />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 transition mt-4"
      >
        <LogOut size={18} />
        {!collapsed && "Logout"}
      </button>
    </div>
  );
};

export default Sidebar;