import { VStack, Button, ButtonGroup, Heading } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import TextField from "./TextField.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const SignUp = () => {
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
          // alert(JSON.stringify(values, null, 2));
          const vals = { ...values };
          actions.resetForm();
          fetch("http://localhost:3000/auth/register", {
            method: "PORT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(vals),
          })
            .catch((err) => {
              return;
            })
            .then((res) => {
              if (!res || !res.ok || res.status >= 400) {
                return;
              }
              return res.json();
            })
            .then((data) => {
              if (!data) return;
              console.log(data);
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

export default SignUp;
