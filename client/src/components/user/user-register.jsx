import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert";
import { userRegister } from "../../lib/api/user-api";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

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
    const { name, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      await alertError("Password don't match");
      return;
    }

    const response = await userRegister({
      username: username,
      password: password,
      name: name,
    });

    const responBody = await response.json();
    console.log(responBody);

    if (response.status == 200) {
      await alertSuccess("User created succesfully");

      navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responBody.errors);
    }
  };

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-500"></i>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-id-card text-gray-500"></i>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-500"></i>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-check-double text-gray-500"></i>
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
          >
            <i className="fas fa-user-plus mr-2"></i> Register
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
