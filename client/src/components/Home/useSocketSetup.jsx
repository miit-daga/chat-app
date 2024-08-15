import { useContext, useEffect } from "react";
import socketFactory from "../../socket.js";
import { AccountContext } from "../AccountContext.jsx";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser, user } = useContext(AccountContext);

  useEffect(() => {
    const socket = socketFactory(user);
    if (!socket.connected) {
      socket.connect();
    }

    const handleFriends = (friendList) => {
      setFriendList(friendList);
    };

    const handleMessages = (messages) => {
      setMessages(messages);
    };

    const handleDM = (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    const handleConnected = (status, username) => {
      setFriendList((prevFriends) =>
        prevFriends.map((friend) => {
          if (friend.username === username) {
            return { ...friend, connected: status };
          }
          return friend;
        }),
      );
    };

    const handleConnectError = () => {
      setUser({ loggedIn: false });
    };

    socket.on("friends", handleFriends);
    socket.on("messages", handleMessages);
    socket.on("dm", handleDM);
    socket.on("connected", handleConnected);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("friends", handleFriends);
      socket.off("messages", handleMessages);
      socket.off("dm", handleDM);
      socket.off("connected", handleConnected);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [setUser, setFriendList, setMessages, user]);
};

export default useSocketSetup;
