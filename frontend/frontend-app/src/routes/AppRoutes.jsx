import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserDashboard from "../Pages/UserDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import AnalystDashboard from "../Pages/AnalystDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Search from "../Pages/Search";
import IPDetails from "../Pages/IPDetails";
import Alerts from "../Pages/Alerts";        
import Analytics from "../Pages/Analytics";  

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ip/:id"
        element={
          <ProtectedRoute>
            <IPDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Alerts />          
          </ProtectedRoute>
        }
      />

      {/* Role-specific dashboards */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analyst-dashboard"
        element={
          <ProtectedRoute role="ANALYST">
            <AnalystDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute role="ANALYST">
            <Analytics />       
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <div>User Management (Coming Soon)</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute role="ADMIN">
            <div>System Logs (Coming Soon)</div>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;   