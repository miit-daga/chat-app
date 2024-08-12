import { useContext, useEffect } from "react";
import socket from "../../socket.js";
import { AccountContext } from "../AccountContext.jsx";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    // Only connect once
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

    // Set up socket event listeners
    socket.on("friends", handleFriends);
    socket.on("messages", handleMessages);
    socket.on("dm", handleDM);
    socket.on("connected", handleConnected);
    socket.on("connect_error", handleConnectError);

    // Cleanup function to remove event listeners
    return () => {
      socket.off("friends", handleFriends);
      socket.off("messages", handleMessages);
      socket.off("dm", handleDM);
      socket.off("connected", handleConnected);
      socket.off("connect_error", handleConnectError);
    };
  }, [setUser, setFriendList, setMessages]);
 
  // Ensure cleanup on unmount
};

export default useSocketSetup;
