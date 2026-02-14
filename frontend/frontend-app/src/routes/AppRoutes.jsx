import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserDashboard from "../Pages/UserDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import AnalystDashboard from "../Pages/AnalystDashboard";
// import LandingPage from "../pages/LandingPage";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import UserDashboard from "../pages/UserDashboard";
// import AdminDashboard from "../pages/AdminDashboard";
// import AnalystDashboard from "../pages/AnalystDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analyst-dashboard"
        element={
          <ProtectedRoute role="analyst">
            <AnalystDashboard/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
