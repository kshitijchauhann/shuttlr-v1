import { Flex, Box, Text, Button, Portal } from "@chakra-ui/react";

interface ConfirmDeleteDialogProps {
    open: boolean;
    fileName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmDeleteDialog = ({ open, fileName, onClose, onConfirm }: ConfirmDeleteDialogProps) => {
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
                    onClick={(e) => e.stopPropagation()}
                >
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Delete File
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={6}>
                        Are you sure you want to delete <strong>{fileName}</strong>? This action cannot be undone.
                    </Text>

                    <Flex justify="flex-end" gap={3}>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button bg="red.500" color="white" _hover={{ bg: "red.600" }} onClick={onConfirm}>
                            Delete
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Portal>
    );
};
