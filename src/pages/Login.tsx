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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Invalid credentials");
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
          <Card.Title fontSize="2xl">Login</Card.Title>
          <Card.Description>Enter your Email and password</Card.Description>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field.Root>

            <Button colorScheme="blue" w="full" onClick={handleLogin} disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Sign In"}
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
