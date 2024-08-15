import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: null,
    token: localStorage.getItem("token"),
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/login`, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (!res || !res.data || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...res.data });
        navigate("/home");
      })
      .catch((err) => {
        setUser({ loggedIn: false });
      });
    // eslint-disable-next-line
  }, [setUser]);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};
export default UserContext;
