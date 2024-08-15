import { VStack, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "../TextField.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AccountContext } from "../AccountContext.jsx";

const Register = () => {
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
          username: yup
            .string()
            .required("Username is required")
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username must be at most 20 characters"),
          password: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(28, "Password too long")
            .matches(
              /[a-z]/,
              "Password must contain at least one lowercase letter",
            )
            .matches(
              /[A-Z]/,
              "Password must contain at least one uppercase letter",
            )
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(
              /[\W_]/,
              "Password must contain at least one special character",
            ),
        })}
        onSubmit={(values, actions) => {
          const vals = { ...values };
          actions.resetForm();

          axios
            .post(
              `${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/register`,
              vals,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              },
            )
            .then((res) => {
              if (res.data.loggedIn) {
                navigate("/home");
                setUser({ ...res.data });
                localStorage.setItem("token", res.data.token);
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
          <Heading>Sign Up</Heading>
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
              Create Account
            </Button>
            <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
              Go back
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  );
};

export default Register;
