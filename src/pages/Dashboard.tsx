import {
  Flex,
  Image,
  HStack,
  Text,
  Clipboard,
  IconButton,
  Avatar,
  Button,
  VStack,
  Box,
  Icon,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import {
  FiHome,
  FiInbox,
  FiSend,
  FiUsers,
  FiSettings,
  FiClock,
  FiHardDrive,
} from "react-icons/fi";

import { LuSearch } from "react-icons/lu";
const menuItems = [
  { label: "Dashboard", icon: FiHome },
  { label: "Send Files", icon: FiSend },
  { label: "History", icon: FiClock },
  { label: "Contacts", icon: FiUsers, active: true },
  { label: "Storage", icon: FiHardDrive },
  { label: "Settings", icon: FiSettings },
];

const Sidebar = () => {
  return (
    <Flex
      h="100vh"
      w="260px"
      bg="#020817"
      color="white"
      direction="column"
      px={4}
      py={6}
    >
      {/* Logo */}
      <HStack mb={8}>
        <Image src="/shuttlr.svg" w="28px" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Shuttlr
          </Text>
          <Text fontSize="xs" color="gray.400">
            Shuttle your files
          </Text>
        </Box>
      </HStack>

      {/* New Transfer Button */}
      <Button
        bg="#f97316"
        _hover={{ bg: "#ea580c" }}
        color="white"
        size="md"
        borderRadius="md"
        mb={6}
      >
        <HStack>
          <Icon as={FiSend} boxSize={5} />
          <Text>New Transfer</Text>
        </HStack>
      </Button>

      {/* Menu */}
      <VStack align="stretch" gap={2}>
        {menuItems.map((item) => {
          return (
            <Button
              key={item.label}
              justifyContent="flex-start"
              variant="ghost"
              bg={item.active ? "#f97316" : "transparent"}
              color={item.active ? "white" : "gray.400"}
              _hover={{
                bg: item.active ? "#ea580c" : "whiteAlpha.100",
                color: "white",
              }}
              borderRadius="md"
            >
              <HStack>
                <Icon as={item.icon} boxSize={5} />
                <Text>{item.label}</Text>
              </HStack>
            </Button>
          );
        })}
      </VStack>
    </Flex>
  );
};

const Header = () => {
  return (
    <Flex
      h="60px"
      w="100%"
      align="center"
      justify="center"
      px={4}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <HStack w="100%" gap={4}>
        <InputGroup startElement={<LuSearch />}>
          <Input w="90%" placeholder="Search contacts" />
        </InputGroup>
        <Text fontSize="sm">daphne@shuttlr.cloud</Text>

        <Clipboard.Root value="daphne@shuttlr.cloud">
          <Clipboard.Trigger asChild>
            <IconButton size="xs" variant="outline">
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>

        <Avatar.Root>
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
};

const Dashboard = () => {
  return (
    <Flex h="100vh" w="100%">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex flex="1" direction="column">
        <Header />

        <Flex p={6}>
          <Text fontSize="xl" fontWeight="bold">
            Dashboard Content
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
