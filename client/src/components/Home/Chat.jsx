import { TabPanel, TabPanels, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "./Home.jsx";

const Chat = () => {
  const { friendList } = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>Friend one</TabPanel>
        <TabPanel>Friend two</TabPanel>
      </TabPanels>
    </VStack>
  ) : (
    <VStack
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          No friends to show.
          <p>Click add friend to start chatting.</p>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
