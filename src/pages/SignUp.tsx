import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Flex,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "../lib/auth-client";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name
      });

      if (error) {
        setError(error.message || "An error occurred during sign up");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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
            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <PasswordInput placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Field.Root>

            <Button colorScheme="blue" w="full" onClick={handleSignUp} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Sign Up"}
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
