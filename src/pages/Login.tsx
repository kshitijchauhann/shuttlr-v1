import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Flex,
  Text,
  Link,
} from "@chakra-ui/react";

import { PasswordInput } from "@/components/ui/password-input";
const Login = () => {
  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justify="center"
      bg="gray.100"
      px="4"
    >
      <Card.Root w="380px">
        <Card.Header textAlign="center">
          <Card.Title fontSize="2xl">Login</Card.Title>
          <Card.Description>Enter your User ID and password</Card.Description>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            <Field.Root>
              <Field.Label>User ID</Field.Label>
              <Input placeholder="Enter your user ID" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Enter password" />
            </Field.Root>

            <Button colorScheme="blue" w="full">
              Sign In
            </Button>

            <Text textAlign="right" fontSize="sm">
              <Link href="/forgot-password" color="blue.500">
                Forgot Password?
              </Link>
            </Text>
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent="center">
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link href="/signup" color="blue.500">
              Create one
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default Login;
