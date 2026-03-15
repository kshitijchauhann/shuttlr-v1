import {
  Flex,
  Image,
  HStack,
  Text,
  Clipboard,
  IconButton,
  Avatar,
  Button,
  CloseButton,
  Drawer,
  Portal,
  VStack,
  Box,
  SimpleGrid,
  Card,
  Stat,
  ProgressCircle,
  AbsoluteCenter,
} from "@chakra-ui/react";

import { FiHome, FiInbox, FiSend, FiUsers, FiSettings } from "react-icons/fi";

const Dashboard = () => {
  return (
    <Flex h="100vh" w="100%" direction="column">
      <Header />
      <SimpleGrid columns={{ base: 1, md: 3 }} px={2} gap={6} mt={6}>
        {/* Files Received */}
        <Card.Root p={6}>
          <Stat.Root>
            <Stat.Label>Files received total</Stat.Label>
            <Stat.ValueText fontSize="3xl">19</Stat.ValueText>
          </Stat.Root>
        </Card.Root>

        {/* Files Sent */}
        <Card.Root p={6}>
          <Stat.Root>
            <Stat.Label>Files sent total</Stat.Label>
            <Stat.ValueText fontSize="3xl">26</Stat.ValueText>
          </Stat.Root>
        </Card.Root>

        {/* Storage Used */}
        <Card.Root p={6}>
          <Stat.Root>
            <Stat.Label>Storage used</Stat.Label>

            <ProgressCircle.Root value={35} size="80px">
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
              </ProgressCircle.Circle>

              <AbsoluteCenter>
                <ProgressCircle.ValueText />
              </AbsoluteCenter>
            </ProgressCircle.Root>
          </Stat.Root>
        </Card.Root>
      </SimpleGrid>
    </Flex>
  );
};

const topMenu = [
  { label: "Dashboard", icon: FiHome },
  { label: "Inbox", icon: FiInbox },
  { label: "Sent", icon: FiSend },
  { label: "Contacts", icon: FiUsers },
];

const Header = () => {
  return (
    <Flex
      h="60px"
      w="100%"
      direction="row"
      align="center"
      border="sm"
      justify="space-between"
      px={2}
    >
      <Image h="40px" w="40px" fit="contain" src="/shuttlr.svg" />
      <HStack>
        <Text>daphne@shuttlr.cloud</Text>
        <Clipboard.Root value="daphne@shuttlr.cloud">
          <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs">
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </HStack>
      <Avatar.Root>
        <Avatar.Fallback name="Segun Adebayo" />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
    </Flex>
  );
};
const Demo = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body p={0}>
              <Flex direction="column" justify="space-between" h="100%">
                {/* Top Menu */}
                <VStack align="stretch" gap={2} p={4}>
                  {topMenu.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <HStack
                        key={index}
                        p={3}
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                      >
                        <Box as={Icon} size="20px" />
                        <Text>{item.label}</Text>
                      </HStack>
                    );
                  })}
                </VStack>

                {/* Bottom Settings */}
                <Box p={4}>
                  <HStack
                    p={3}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Box as={FiSettings} size="20px" />
                    <Text>Settings</Text>
                  </HStack>
                </Box>
              </Flex>
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Dashboard;
