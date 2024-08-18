import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { FriendContext, MessagesContext } from "./Home.jsx";
import ChatBox from "./ChatBox.jsx";

const Chat = ({ user }) => {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessagesContext);
  const bottomDivRefs = useRef([]);
  if (bottomDivRefs.current.length !== friendList.length) {
    bottomDivRefs.current = Array(friendList.length)
      .fill()
      .map((_, i) => bottomDivRefs.current[i] || React.createRef());
  }

  useEffect(() => {
    const activeFriendIndex = friendList.findIndex(
      (friend) => friend.user === user,
    );
    if (activeFriendIndex !== -1) {
      bottomDivRefs.current[activeFriendIndex]?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, friendList, user]);

  return friendList.length > 0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflowY="scroll">
        {friendList.map((friend, index) => (
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            key={`chat:${friend.username}`}
            w="100%"
          >
            <div ref={bottomDivRefs.current[index]} />
            {messages
              .filter(
                (msg) => msg.to === friend.user || msg.from === friend.user,
              )
              .map((message, idx) => (
                <Text
                  m={
                    message.to === friend.user
                      ? "1rem 0 0 auto !important"
                      : "1rem auto 0 0 !important"
                  }
                  maxWidth="50%"
                  key={`msg=${friend.username}.${idx}`}
                  fontSize="lg"
                  bg={message.to === friend.user ? "blue.100" : "gray.100"}
                  borderRadius="10px"
                  p="0.5rem 1rem"
                  color="gray.800"
                >
                  {message.content}
                </Text>
              ))}
          </VStack>
        ))}
      </TabPanels>
      <ChatBox user={user} />
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
