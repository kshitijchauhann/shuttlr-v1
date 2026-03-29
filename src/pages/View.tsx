import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  IconButton,
  Button,
  Container,
  Icon,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react"; // Assuming Avatar is from Chakra V3 as seen in Dashboard
import {
  FiMoreHorizontal,
  FiDownload,
  FiEdit3,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6";

const View = () => {
  return (
    <Flex direction="column" minH="100vh" bg="#FAFAFA">
      {/* Header */}
      <Flex
        as="header"
        w="full"
        px={6}
        py={4}
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        align="center"
        justify="space-between"
      >
        <Text fontSize="xl" fontWeight="semibold" color="gray.800">
          Shuttlr
        </Text>

        <HStack gap={4}>
          <Box
            px={3}
            py={1}
            bg="orange.100"
            color="orange.800"
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            Expires in 5 days
          </Box>
          <IconButton
            variant="ghost"
            aria-label="More options"
            size="sm"
            color="gray.600"
          >
            <FiMoreHorizontal />
          </IconButton>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Container maxW="5xl" py={8} px={6}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={6}
          align="flex-start"
        >
          {/* Left Column */}
          <Flex direction="column" flex="1" gap={4} w="full">
            {/* File Info Card */}
            <Flex
              p={4}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
              align="center"
              gap={4}
            >
              <Flex
                align="center"
                justify="center"
                w={12}
                h={12}
                bg="blue.50"
                color="blue.500"
                borderRadius="lg"
              >
                <Icon as={FaRegFilePdf} fontSize="xl" />
              </Flex>
              <Box>
                <Text fontSize="md" fontWeight="semibold" color="gray.900">
                  Contract_v2.pdf
                </Text>
                <Text fontSize="sm" color="gray.500">
                  2 pages • 340 KB • Sent Mar 29, 2026
                </Text>
              </Box>
            </Flex>

            {/* Document Preview Card */}
            <Flex
              direction="column"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
              p={6}
            >
              <Flex
                direction="column"
                bg="#F4F3ED"
                borderRadius="lg"
                p={8}
                align="center"
                justify="center"
                minH="450px"
              >
                {/* Skeleton Document Page */}
                <Box
                  bg="white"
                  w="full"
                  maxW="260px"
                  h="340px"
                  boxShadow="sm"
                  borderRadius="md"
                  p={6}
                >
                  <VStack align="stretch" gap={4}>
                    <Box h={2} w="50%" bg="gray.300" borderRadius="sm" />
                    <VStack align="stretch" gap={3} mt={4}>
                      <Box h="6px" w="full" bg="gray.100" borderRadius="sm" />
                      <Box h="6px" w="90%" bg="gray.100" borderRadius="sm" />
                      <Box h="6px" w="40%" bg="gray.100" borderRadius="sm" />
                    </VStack>
                    <VStack align="stretch" gap={3} mt={4}>
                      <Box h="6px" w="full" bg="gray.100" borderRadius="sm" />
                      <Box h="6px" w="full" bg="gray.100" borderRadius="sm" />
                      <Box h="6px" w="85%" bg="gray.100" borderRadius="sm" />
                    </VStack>
                    <VStack align="stretch" gap={3} mt={4}>
                      <Box h="6px" w="80%" bg="gray.100" borderRadius="sm" />
                      <Box h="6px" w="full" bg="gray.100" borderRadius="sm" />
                    </VStack>
                  </VStack>
                </Box>

                {/* Pagination */}
                <HStack mt={8} gap={4}>
                  <IconButton
                    variant="outline"
                    bg="white"
                    borderColor="gray.200"
                    color="gray.600"
                    aria-label="Previous page"
                    size="sm"
                    borderRadius="md"
                  >
                    <FiChevronLeft />
                  </IconButton>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    Page 1 of 2
                  </Text>
                  <IconButton
                    variant="outline"
                    bg="white"
                    borderColor="gray.200"
                    color="gray.600"
                    aria-label="Next page"
                    size="sm"
                    borderRadius="md"
                  >
                    <FiChevronRight />
                  </IconButton>
                </HStack>
              </Flex>
            </Flex>
          </Flex>

          {/* Right Column */}
          <Flex direction="column" w={{ base: "full", lg: "320px" }} gap={4}>
            {/* From Card */}
            <Box
              p={5}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                letterSpacing="wide"
                mb={4}
              >
                FROM
              </Text>
              <HStack gap={3}>
                <Avatar.Root size="md" bg="purple.100" color="purple.700">
                  <Avatar.Fallback name="John Doe" />
                </Avatar.Root>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                    John Doe
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    john@shuttlr.com
                  </Text>
                </Box>
              </HStack>
            </Box>

            {/* AI Summary Card */}
            <Box
              p={5}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                letterSpacing="wide"
                mb={4}
              >
                AI SUMMARY
              </Text>
              <Box bg="#F4F3ED" p={4} pl={4} position="relative">
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  bottom="0"
                  w="3px"
                  bg="purple.400"
                />
                <Text fontSize="sm" color="gray.700" lineHeight="tall">
                  A 2-page software development contract between John Doe and
                  Acme Inc. covering scope, payment terms, and IP ownership.
                </Text>
              </Box>
            </Box>

            {/* Actions Card */}
            <Box
              p={5}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                letterSpacing="wide"
                mb={4}
              >
                ACTIONS
              </Text>
              <VStack align="stretch" gap={3}>
                <Button
                  variant="outline"
                  borderColor="gray.200"
                  color="gray.900"
                  w="full"
                  justifyContent="center"
                >
                  <FiDownload />
                  Download
                </Button>
                <Button
                  variant="outline"
                  borderColor="gray.200"
                  color="gray.900"
                  w="full"
                  justifyContent="center"
                >
                  <FiEdit3 />
                  Sign document
                </Button>
              </VStack>

              <Box
                mt={6}
                pt={5}
                borderTop="1px solid"
                borderColor="gray.100"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.600">
                  Want to send files like this?{" "}
                  <Text
                    as="span"
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Get your free Shuttlr ID
                  </Text>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default View;
