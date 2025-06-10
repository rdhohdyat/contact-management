import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/user-api";
import { alertError } from "../../lib/alert";

export default function Logout() {
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage("token", "");

  async function handleLogout() {
    const response = await userLogout(token);
    const responseBody = await response.json();

    if (response.status >= 500) {
      await navigate({
        pathname: "/server-error",
      });
    }

    if (response.status == 200) {
      setToken("");

      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    handleLogout().then(() => console.log("user logout is successfully"));
  });

  return <div></div>;
}
