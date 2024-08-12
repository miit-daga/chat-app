import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import TextField from "../TextField.jsx";
import { Form, Formik } from "formik";
import * as yup from "yup";
import socket from "../../socket.js";
import { FriendContext } from "./Home.jsx";

const friendSchema = yup.object({
  friendName: yup
    .string()
    .required("Username is required")
    .min(4, "Invalid username!")
    .max(28, "Invalid username!"),
});

const AddFriendModal = ({ isOpen, onClose }) => {
  const [error, setError] = React.useState("");
  const handleClose = () => {
    setError("");
    onClose();
  };
  const { setFriendList } = useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values, actions) => {
            socket.emit(
              "add_friend",
              values.friendName,
              ({ errorMsg, done, newFriend }) => {
                if (done) {
                  setFriendList((prevFriendList) => [
                    newFriend,
                    ...prevFriendList,
                  ]);
                  handleClose();
                  return;
                }
                setError(errorMsg);
              },
            );
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <Heading as="p" color="red.500" textAlign="center" fontSize="xl">
                {error}
              </Heading>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username."
                autoComplete="off"
                name="friendName"
              ></TextField>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
