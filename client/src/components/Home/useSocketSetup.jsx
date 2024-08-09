import { useContext, useEffect } from "react";
import socket from "../../socket.js";
import { AccountContext } from "../AccountContext.jsx";

const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on("connect error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("connect_error");
    };
  }, [setUser]);
};

export default useSocketSetup;
