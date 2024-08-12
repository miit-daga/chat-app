import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  HStack,
  TabList,
  VStack,
  Text,
  Tab,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "./Home.jsx";
import AddFriendModal from "./AddFriendModal.jsx";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend </Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList.map((friend) => (
            <HStack as={Tab} key={`friend:${friend.username}`}>
              <Circle
                bg={friend.connected ? "green.400" : "red.500"}
                w="10px"
                h="10px"
              />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
