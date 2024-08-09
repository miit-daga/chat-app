import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import TextField from "../TextField.jsx";
import { Form, Formik } from "formik";
import * as yup from "yup";

const friendSchema = yup.object({
  friendName: yup
    .string()
    .required("Username is required")
    .min(4, "Invalid username!")
    .max(28, "Invalid username!"),
});

const AddFriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values, actions) => {
            onClose();
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Friend name"
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
