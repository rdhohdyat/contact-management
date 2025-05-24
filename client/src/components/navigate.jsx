import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function Navigate() {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useLocalStorage("user", "");

  const navigate = useNavigate();

  const isAuthenticated = () => {
    return token !== null && user !== null;
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        pathname: "/dashboard/contacts",
      });
    }
  }, []);

  return <div></div>;
}
