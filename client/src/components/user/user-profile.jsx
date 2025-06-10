import { useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import {
  userDetail,
  userUpdatePassword,
  userUpdateProfile,
} from "../../lib/api/user-api";
import { alertError, alertSuccess } from "../../lib/alert";

export default function Profile() {
  const [name, setName] = useState();

  const initialFormState = {
    newPassword: "",
    confirmPassword: "",
  };

  const [formUpdatePassword, setFormUpdatePassword] =
    useState(initialFormState);

  const [token, _] = useLocalStorage("token", "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormUpdatePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function fetchUserDetail() {
    const response = await userDetail(token);
    const responseBody = await response.json();

    if (response.status == 200) {
      setName(responseBody.data.name);
    } else {
      alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchUserDetail().then(() => console.log("user detail fetch succesfully"));
  });

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    const response = await userUpdateProfile(token, {
      name,
    });

    const responseBody = await response.json();

    if (response.status == 200) {
      alertSuccess("update profile is successfully");
    } else {
      alertError(responseBody.errors);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formUpdatePassword;

    if (newPassword !== confirmPassword) {
      await alertError("new password don't match with confirm password");
      return;
    }

    const response = await userUpdatePassword(token, {
      password: newPassword,
    });

    const responseBody = await response.json();

    if (response.status == 200) {
      alertSuccess("update password is succesfully");
      resetForm();
    } else {
      alertError(responseBody.errors);
    }
  };

  const resetForm = () => {
    setFormUpdatePassword(initialFormState);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-user-edit text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
            </div>
            <form onSubmit={handleSubmitProfile}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your full name"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <i className="fas fa-save mr-2" /> Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-key text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Change Password
              </h2>
            </div>
            <form onSubmit={handleSubmitPassword}>
              <div className="mb-5">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your new password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-check-double text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Confirm your new password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <i className="fas fa-key mr-2" /> Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
