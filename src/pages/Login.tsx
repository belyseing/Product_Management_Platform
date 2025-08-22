import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { FormData, FormErrors } from "../types/user";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value.toLowerCase(),
    }));
  };

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.username) errors.username = "Please enter a username";
    if (!formData.password) errors.password = "Please enter a password";
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await login(formData.username, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/productList");
    } else {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-center text-teal-700">Welcome Back</h1>
        <p className="text-center text-sm text-gray-500 ">Log in to your account</p>

        {errors.general && (
          <p className="text-red-600 bg-red-100 p-2 rounded text-center">
            {errors.general}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-indigo-600 font-medium hover:text-indigo-800"
          >
          
          </button>
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            Remember me
          </label>
          <a href="" className="text-teal-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="" className="text-teal-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
