/* eslint-disable no-undef */
import { io } from "socket.io-client";

const socket = (user) => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_SERVER_URL, {
        autoConnect: false,
        withCredentials: true,
        auth: {
            token: user?.token || "",
        },
    });
    return newSocket;
};

export default socket;
