import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { userLogout } from "../lib/api/user-api";

export default function DashboardLayout() {
  const [token, setToken] = useLocalStorage("token", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alertError("Log into your account to continue");
      navigate({
        pathname: "/login",
      });
    }
  }, []);

  const handleLogout = async () => {
    const confirmed = await alertConfirm("Logout from your account?");

    if (!confirmed) {
      return;
    } else {
      const response = await userLogout(token);
      const responseBody = await response.json();

      if (response.status >= 500) {
        await navigate({
          pathname: "/server-error",
        });
      }

      if (response.status == 200) {
        await alertSuccess("Success logout from your account");
        setToken("");

        await navigate({
          pathname: "/login",
        });
      } else {
        await alertError(responseBody.errors);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
      <header className="bg-gradient shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/dashboard/contacts"
            className="flex items-center hover:opacity-90 transition-opacity duration-200"
          >
            <i className="fas fa-address-book text-white text-2xl mr-3" />
            <div className="text-white font-bold text-xl">
              Contact Management
            </div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/dashboard/users/profile"
                  className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
                >
                  <i className="fas fa-user-circle mr-2" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-gray-100 hover:text-white flex items-center transition-colors duration-200"
                >
                  <i className="fas fa-sign-out-alt mr-2" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
        <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
          <p>© 2025 Contact Management. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
