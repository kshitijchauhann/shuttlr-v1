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
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  FiHome,
  FiSend,
  FiClock,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import Dashboard from "./Dashboard";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Profile from "./Profile";
import Settings from "./Settings";

const menuItems = [
  { label: "Dashboard", icon: FiHome, active: true },
  { label: "Inbox", icon: FiSend, active: false },
  { label: "Sent", icon: FiClock, active: false },
  { label: "Profile", icon: FiUsers, active: false },
  { label: "Settings", icon: FiSettings, active: false },
];

const Sidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
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
          const isActive = activeTab === item.label;
          return (
            <Button
              key={item.label}
              justifyContent="flex-start"
              variant="ghost"
              bg={isActive ? "#f97316" : "transparent"}
              color={isActive ? "white" : "gray.400"}
              _hover={{
                bg: isActive ? "#ea580c" : "whiteAlpha.100",
                color: "white",
              }}
              borderRadius="md"
              onClick={() => setActiveTab(item.label)}
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

const Header = ({
  title,
  Dashboard,
  Inbox,
  Sent,
  Profile,
  Settings,
}: {
  title: string;
  Dashboard: any;
  Inbox: any;
  Sent: any;
  Profile: any;
  Settings: any;
}) => {
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
        <Heading>{title}</Heading>
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

const Home = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Inbox":
        return <Inbox />;
      case "Sent":
        return <Sent />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Flex h="100vh" w="100%">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <Flex flex="1" direction="column">
        <Header
          title={activeTab}
          Dashboard={Dashboard}
          Inbox={Inbox}
          Sent={Sent}
          Profile={Profile}
          Settings={Settings}
        />

        <Flex flex="1" overflowY="auto">
          {renderContent()}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
