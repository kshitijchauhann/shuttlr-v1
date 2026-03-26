import { Flex, Box, Text, IconButton, Portal } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

interface TimelineEvent {
    title: string;
    description: string;
    time: string;
}

export interface TimelineDialogProps {
    open: boolean;
    onClose: () => void;
    fileName: string;
    events: TimelineEvent[];
}

export const TimelineDialog = ({ open, onClose, fileName, events }: TimelineDialogProps) => {
    if (!open) return null;

    return (
        <Portal>
            <Flex
                position="fixed"
                top="0"
                left="0"
                w="100vw"
                h="100vh"
                bg="blackAlpha.500"
                zIndex="overlay"
                justify="center"
                align="center"
                onClick={onClose}
            >
                <Box
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    w="400px"
                    maxW="90vw"
                    boxShadow="xl"
                    position="relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton
                        aria-label="Close"
                        variant="ghost"
                        size="sm"
                        position="absolute"
                        top={4}
                        right={4}
                        onClick={onClose}
                    >
                        <FiX />
                    </IconButton>

                    <Text fontSize="lg" fontWeight="bold" mb={1}>
                        File Timeline
                    </Text>
                    <Text fontSize="sm" color="gray.500" mb={6}>
                        {fileName}
                    </Text>

                    <Flex direction="column">
                        {events.map((event, index) => (
                            <Flex key={index} gap={4}>
                                <Flex direction="column" align="center" mt={1}>
                                    <Box w={3} h={3} borderRadius="full" bg="orange.400" />
                                    {index < events.length - 1 && (
                                        <Box w="2px" flex="1" bg="gray.200" my={1} />
                                    )}
                                </Flex>
                                <Box pb={6}>
                                    <Text fontWeight="semibold" fontSize="md" color="gray.800">
                                        {event.title}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600">
                                        {event.description}
                                    </Text>
                                    <Text fontSize="xs" color="gray.400" mt={1}>
                                        {event.time}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Portal>
    );
};
