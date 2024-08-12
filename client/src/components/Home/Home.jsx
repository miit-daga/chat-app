import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import useSocketSetup from "./useSocketSetup.jsx";

export const FriendContext = createContext();
export const MessagesContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [friendIndex, setFriendIndex] = React.useState(0);
  useSocketSetup(setFriendList, setMessages);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid
        templateColumns="repeat(10,1fr)"
        h="100vh"
        as={Tabs}
        onChange={(index) => {    //chakra UI tab feature that gives the index of the tab clicked
          setFriendIndex(index); 
        }}
      >
        <GridItem colSpan="2" borderRight="1px solid gray">
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan="8" maxHeight="100vh">
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <Chat user={friendList[friendIndex]?.user} />
          </MessagesContext.Provider>
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
