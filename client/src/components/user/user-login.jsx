import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../lib/api/user-api";
import { alertError } from "../../lib/alert";
import { useLocalStorage } from "react-use";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [_, setToken] = useLocalStorage("token", "");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { username, password } = formData;

      const response = await userLogin({
        username,
        password,
      });

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });

      const responBody = await response.json();

      if (response.status >= 500) {
        await navigate({
          pathname: "/server-error",
        });
        return;
      }

      if (response.status === 200) {
        const token = responBody.data.token;
        setToken(token);

        await navigate({
          pathname: "/dashboard/contacts",
        });
      } else {
        await alertError(responBody.errors);
      }
    } catch (error) {
      await alertError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-address-book text-3xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-500" />
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-500" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient disabled:opacity-60 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:opacity-60"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2" /> Please wait...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2" /> Sign In
              </>
            )}
          </button>
        </div>
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
