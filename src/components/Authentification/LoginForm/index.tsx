import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

import { ReactComponent as Logo } from "assets/black_logo.svg";
import { Form, Formik } from "formik";
import { Input, Textarea } from "components/Fields";
import { NavLink, useHistory } from "react-router-dom";
import { useLogin } from "call/actions/auth";

export const LoginForm: React.FC = () => {
  const { mutateAsync: login, error } = useLogin();
  const history = useHistory();

  // For dev facilities

  const initialValues =
    process.env.NODE_ENV === "development"
      ? { identifier: "dev@dev.com", password: "testtest" }
      : {
          identifier: "process-bot",
          password: "bot-mangly-WOLVES-canopee",
        };

  return (
    <Box backgroundColor="white" p="110px 50px" w="480px">
      <Box d="flex" justifyContent="center">
        <Logo />
      </Box>

      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={async (data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          const loginPromise = await login(data);

          if (loginPromise.login) {
            localStorage.setItem(
              "process__user",
              JSON.stringify(loginPromise.login)
            );
            history.push(`/dashboard`);
          }
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Box w="100%" pt="90px" textAlign="left">
                <Flex justifyContent="center" flexDirection="column" w="100%">
                  {error && <p>{error.name}</p>}
                  <Textarea
                    isCollapsed={false}
                    rows="small"
                    label="Identifiant"
                    placeholder="Renseigner votre identifiant"
                    id="identifier"
                    isRequired
                  />
                  <Input
                    isCollapsed={false}
                    label="Mot de passe"
                    placeholder="Renseigner votre mot de passe"
                    name="password"
                    type="password"
                    isRequired
                  />
                  <Box>
                    <Button variant="link">Mot de passe oublié ? </Button>
                  </Box>
                  <Flex justifyContent="space-between" pt="90px">
                    <NavLink to="/inscription">
                      <Button variant="rounded">Créer un compte</Button>
                    </NavLink>

                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      variant="roundedBlue"
                    >
                      Connexion
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};