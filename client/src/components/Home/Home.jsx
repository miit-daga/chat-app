import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import useSocketSetup from "./useSocketSetup.jsx";
import socketConn from "../../socket.js";
import { AccountContext } from "../AccountContext.jsx";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);
  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => {
    const newSocket = socketConn(user);
    newSocket.connect();
    return newSocket;
  });
  useSocketSetup(setFriendList, setMessages);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <SocketContext.Provider value={{ socket }}>
        <Grid
          templateColumns="repeat(10,1fr)"
          h="100vh"
          as={Tabs}
          onChange={(index) => {
            //chakra UI tab feature that gives the index of the tab clicked
            setFriendIndex(index);
          }}
        >
          <GridItem colSpan="3" borderRight="1px solid gray">
            <Sidebar></Sidebar>
          </GridItem>
          <GridItem colSpan="7" maxHeight="100vh">
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <Chat user={friendList[friendIndex]?.user} />
            </MessagesContext.Provider>
          </GridItem>
        </Grid>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default Home;
