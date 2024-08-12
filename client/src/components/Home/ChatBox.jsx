import { Button, HStack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Input } from "@chakra-ui/react";
import socket from "../../socket.js";
import { MessagesContext } from "./Home.jsx";
import { AccountContext } from "../AccountContext.jsx";

const ChatBox = ({ user }) => {
  const { setMessages } = React.useContext(MessagesContext);
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={yup.object({
        message: yup.string().min(1).max(1000),
      })}
      onSubmit={(values, actions) => {
        const trimmedMessage = values.message.trim();
        if (!trimmedMessage) {
          actions.resetForm();
          return;
        }
        const message = { to: user, from: null, content: values.message };
        socket.emit("dm", message);
        setMessages((prevMessages) => [message, ...prevMessages]);
        console.log(JSON.stringify(message));
        actions.resetForm();
      }}
    >
      <HStack as={Form} w="99%" pb="0.4rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here..."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" colorScheme="teal" size="lg">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;
