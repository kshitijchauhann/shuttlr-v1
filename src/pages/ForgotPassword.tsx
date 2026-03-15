import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Flex,
  PinInput,
} from "@chakra-ui/react";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justify="center"
      bg="gray.100"
      px="4"
    >
      {step === 1 && <StepOne next={() => setStep(2)} />}
      {step === 2 && <StepTwo next={() => setStep(3)} />}
      {step === 3 && <StepThree />}
    </Flex>
  );
};

const StepOne = ({ next }) => {
  return (
    <Card.Root w="380px">
      <Card.Header textAlign="center">
        <Card.Title fontSize="2xl">Password Reset</Card.Title>
        <Card.Description>
          Enter your email or user id associated with the account
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>User ID / Email</Field.Label>
            <Input placeholder="Enter your user id or email" />
          </Field.Root>

          <Button onClick={next}>Proceed</Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

const StepTwo = ({ next }) => {
  return (
    <Card.Root w="380px">
      <Card.Header textAlign="center">
        <Card.Title fontSize="2xl">Verify Account</Card.Title>
        <Card.Description>
          We sent a verification link to your email
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4">
          <Button onClick={next}>Continue</Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

const StepThree = () => {
  return (
    <Card.Root w="380px">
      <Card.Header textAlign="center">
        <Card.Title fontSize="2xl">Password Reset</Card.Title>
        <Card.Description>
          Enter the 6 digit code sent to your e-mail
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4">
          <PinInput.Root>
            <PinInput.HiddenInput />
            <PinInput.Control>
              <PinInput.Input index={0} />
              <PinInput.Input index={1} />
              <PinInput.Input index={2} />
              <PinInput.Input index={3} />
              <PinInput.Input index={4} />
              <PinInput.Input index={5} />
            </PinInput.Control>
          </PinInput.Root>

          <Button>Verify</Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default ForgotPassword;
