import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const { login, error: authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // Check for message from registration
  useEffect(() => {
    if (location.state?.message) {
      setInfoMessage(location.state.message);
      // Clear the state so message doesn't show on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const role = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : null;
      const rolePath = {
        'ADMIN': '/admin-dashboard',
        'ANALYST': '/analyst-dashboard',
        'USER': '/user-dashboard'
      };
      navigate(rolePath[role] || "/");
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setLoginError("");

    const result = await login(formData.email, formData.password);
    
    setLoading(false);

    if (result.success) {
      console.log("✅ Login successful, redirecting...");
      // Navigation will be handled by the useEffect above
    } else {
      setLoginError(result.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Test credentials for quick login
  const fillTestCredentials = (type) => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@test.com',
        password: 'admin123'
      });
    } else if (type === 'analyst') {
      setFormData({
        email: 'analyst@test.com',
        password: 'analyst123'
      });
    } else if (type === 'user') {
      setFormData({
        email: 'user@test.com',
        password: 'user123'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 transition-all">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Global IP Intelligence
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Info Message (from registration) */}
        {infoMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {infoMessage}
          </div>
        )}

        {/* Error Message */}
        {(loginError || authError) && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            <p className="font-medium">Error:</p>
            <p>{loginError || authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800"
              } focus:ring-2 focus:outline-none dark:text-white`}
              autoComplete="email"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all pr-12 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800"
                } focus:ring-2 focus:outline-none dark:text-white`}
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={() => alert("Please contact admin to reset password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white shadow-lg hover:shadow-xl`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Create one
          </Link>
        </p>

       

      </div>
    </div>
  );
};

export default Login;