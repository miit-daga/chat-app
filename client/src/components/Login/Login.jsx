import { VStack, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "./TextField.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AccountContext } from "../AccountContext.jsx";

const Login = () => {
  const [error, setError] = React.useState(null);
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object({
          username: yup.string().required("Username is required"),
        })}
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2));
          const vals = { ...values };
          actions.resetForm();

          axios
            .post("http://localhost:3000/auth/login", vals, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.loggedIn) {
                navigate("/home");
                setUser({ ...res.data });
                console.log(res.data);
              } else {
                setError(
                  res.data.errorMessage || "An error occurred during login",
                );
              }
            })
            .catch((err) => {
              console.error("Request failed:", err);
              setError(
                err.response?.data?.errorMessage ||
                  "An error occurred during login",
              );
            });
        }}
      >
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading>Log in</Heading>
          <Text as="p" color="red.500">
            {error}
          </Text>
          <TextField
            name="username"
            placeholder="Enter your username"
            autoComplete="off"
            label={"Username"}
          />
          <TextField
            name="password"
            placeholder="Enter your password"
            autoComplete="off"
            type="password"
            label={"Password"}
          />
          <ButtonGroup pt="1rem">
            <Button type="submit" colorScheme="teal">
              Log in
            </Button>
            <Button onClick={() => navigate("/register")}>
              Create account
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  );
};

export default Login;
