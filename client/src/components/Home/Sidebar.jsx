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
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "./Home.jsx";
import AddFriendModal from "./AddFriendModal.jsx";

const Sidebar = () => {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem" width="100%">
        <HStack justify="space-between" w="100%" px="1rem" position="relative">
          <Box flex="1">
            <Heading size="md" textAlign="center">
              Add a friend
            </Heading>
          </Box>
          <Button onClick={onOpen} size="sm" variant="ghost">
            <ChatIcon boxSize={5} />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList} width="100%" spacing={2}>
          {friendList.map((friend) => (
            <Box
              as={Tab}
              key={`friend:${friend.username}`}
              width="100%"
              py={2}
              px={4}
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
            >
              <Flex align="center" width="100%" position="relative">
                <Circle
                  bg={friend.connected ? "green.400" : "red.500"}
                  size="12px"
                  position="absolute"
                  left={0}
                />
                <Text fontSize="lg" width="100%" textAlign="center">
                  {friend.username}
                </Text>
              </Flex>
            </Box>
          ))}
        </VStack>
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
