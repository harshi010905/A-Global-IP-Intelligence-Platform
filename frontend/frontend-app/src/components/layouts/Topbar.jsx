import { useAuth } from "../../context/AuthContext";
import { Bell } from "lucide-react";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      
      <h1 className="text-lg font-semibold">
        Welcome, {user?.name}
      </h1>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" size={20} />
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
