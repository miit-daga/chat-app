import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext } from "react";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import useSocketSetup from "./useSocketSetup.jsx";

export const FriendContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = React.useState([]);
  useSocketSetup();
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid templateColumns="repeat(10,1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="2" borderRight="1px solid gray">
          <Sidebar></Sidebar>
        </GridItem>
        <GridItem colSpan="8">
          <Chat></Chat>
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
