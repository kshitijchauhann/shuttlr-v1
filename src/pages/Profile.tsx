import { Flex, Avatar, Card } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex h="100vh" w="100%" align="center" justify="center">
      <Card.Root>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body>
          <Avatar.Root>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default Profile;
