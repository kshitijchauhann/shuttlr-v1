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

const SignUp = () => {
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
          <Card.Title fontSize="2xl">Create Account</Card.Title>
          <Card.Description>
            Fill in the details to create your account
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input placeholder="Enter your name" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input type="email" placeholder="Enter your email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Enter your password" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput placeholder="Confirm your password" />
            </Field.Root>

            <Button colorScheme="blue" w="full">
              Sign Up
            </Button>
          </Stack>
        </Card.Body>

        <Card.Footer justifyContent="center">
          <Text fontSize="sm">
            Already have an account?{" "}
            <Link href="/login" color="blue.500">
              Login
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
