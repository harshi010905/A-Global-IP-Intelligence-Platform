import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserDashboard from "../Pages/UserDashboard";
import AdminDashboard from "../Pages/AdminDashboard";
import AnalystDashboard from "../Pages/AnalystDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Search from "../Pages/Search";
import  IPDetails from "../Pages/IPDetails";
// import Analytics from "./pages/Analytics";
// import Alerts from "./pages/Alerts";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/ip/:id" element={<IPDetails/>} />
      {/* <Route path="/analytics" element={<Analytics />} />
      <Route path="/alerts" element={<Alerts />} /> */}

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
