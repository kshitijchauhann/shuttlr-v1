import { Flex, Box, Text, SimpleGrid, Input, Button, VStack, HStack, IconButton, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { DataTable, type ColumnDef } from "../components/DataTable";
import { TimelineDialog } from "../components/TimelineDialog";
import { ConfirmDeleteDialog } from "../components/ConfirmDeleteDialog";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { Tooltip } from "../components/ui/tooltip";

const statCards = [
    { label: "Files received", value: "24" },
    { label: "Files sent", value: "17" },
    { label: "Active transfers", value: "5" },
    { label: "Storage used", value: "1.2gb" },
];

const initialActivity = [
    { name: "Sara Smith", file: "Contract_v2.pdf", fromTo: "sara@shuttlr.com", date: "Mar 23", status: "Downloaded", statusColor: "green" },
    { name: "Mike Johnson", file: "Proposal.pdf", fromTo: "mike@gmail.com", date: "Mar 22", status: "Pending", statusColor: "orange" },
    { name: "Tom Holland", file: "Invoice_032.pdf", fromTo: "tom@shuttlr.com", date: "Mar 20", status: "Expired", statusColor: "gray" },
    { name: "Legal Dept", file: "NDA_signed.pdf", fromTo: "legal@firm.com", date: "Mar 19", status: "Downloaded", statusColor: "green" },
];

const fakeEventsMap: Record<string, { title: string; description: string; time: string }[]> = {
    "Contract_v2.pdf": [
        { title: "File Sent", description: "You sent the file to sara@shuttlr.com", time: "Mar 23, 09:12 AM" },
        { title: "File Viewed", description: "sara@shuttlr.com viewed the file", time: "Mar 23, 10:45 AM" },
    ],
    default: [
        { title: "File Sent", description: "File was sent securely.", time: "2 days ago" },
        { title: "File Viewed", description: "Recipient opened the link.", time: "1 day ago" }
    ]
};

const Dashboard = () => {
    const [data, setData] = useState(initialActivity);
    const [timelineFile, setTimelineFile] = useState<string | null>(null);
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);

    const activityColumns: ColumnDef<typeof initialActivity[0]>[] = [
        {
            key: "name",
            header: "Name",
            flex: 2,
            render: (item) => (
                <HStack gap={3}>
                    <Avatar.Root size="sm">
                        <Avatar.Fallback name={item.name} />
                    </Avatar.Root>
                    <Text fontSize="sm" fontWeight="medium" color="gray.800">
                        {item.name}
                    </Text>
                </HStack>
            )
        },
        { key: "file", header: "File", flex: 2 },
        { key: "fromTo", header: "From / To", flex: 2 },
        { key: "date", header: "Date", flex: 1 },
        {
            key: "status",
            header: "Status",
            flex: 1,
            render: (item) => (
                <Flex>
                    <Box
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="medium"
                        bg={`${item.statusColor}.100`}
                        color={`${item.statusColor}.800`}
                    >
                        {item.status}
                    </Box>
                </Flex>
            )
        },
        {
            key: "actions",
            header: "Actions",
            flex: 1,
            render: (item) => (
                <HStack gap={2}>
                    <Tooltip content="View Timeline">
                        <IconButton
                            aria-label="View Timeline"
                            size="sm"
                            variant="ghost"
                            color="gray.500"
                            _hover={{ color: "blue.500", bg: "blue.50" }}
                            onClick={() => setTimelineFile(item.file)}
                        >
                            <FiClock />
                        </IconButton>
                    </Tooltip>

                    <Tooltip content="Delete">
                        <IconButton
                            aria-label="Delete File"
                            size="sm"
                            variant="ghost"
                            color="gray.500"
                            _hover={{ color: "red.500", bg: "red.50" }}
                            onClick={() => setFileToDelete(item.file)}
                        >
                            <FiTrash2 />
                        </IconButton>
                    </Tooltip>
                </HStack>
            )
        }
    ];

    return (
        <Flex
            direction="column"
            w="100%"
            h="auto"
            bg="white"
            color="black"
            p={8}
            gap={8}
        >
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
                {statCards.map((stat, i) => (
                    <Box key={i} p={5} bg="#F4F3ED" borderRadius="xl">
                        <Text fontSize="sm" color="gray.600" mb={2}>
                            {stat.label}
                        </Text>
                        <Text fontSize="4xl" fontWeight="normal" color="gray.800" lineHeight="1">
                            {stat.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* Send a file Section */}
            <Box p={6} border="1px solid" borderColor="gray.200" borderRadius="xl">
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Send a file
                </Text>

                <VStack align="stretch" gap={4}>
                    <Input
                        placeholder="Recipient ID or email"
                        size="xl"
                        fontSize="md"
                        borderRadius="md"
                        borderColor="gray.400"
                        _placeholder={{ color: "gray.500" }}
                        px={4}
                        py={3}
                        bg="white"
                    />

                    <HStack w="100%" gap={4} align="stretch">
                        <Flex
                            flex="1"
                            border="2px dashed"
                            borderColor="gray.300"
                            borderRadius="lg"
                            p={3}
                            justify="center"
                            align="center"
                            cursor="pointer"
                            transition="background 0.2s"
                            _hover={{ bg: "gray.50", borderColor: "gray.400" }}
                        >
                            <Text color="gray.600" fontSize="sm">
                                Drop file here or click to upload
                            </Text>
                        </Flex>

                        <Button
                            px={8}
                            py={3}
                            h="auto"
                            bg="white"
                            border="1px solid"
                            borderColor="gray.400"
                            borderRadius="lg"
                            color="black"
                            fontWeight="medium"
                            _hover={{ bg: "gray.50" }}
                        >
                            Send
                        </Button>
                    </HStack>
                </VStack>
            </Box>

            {/* Recent activity Section */}
            <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Recent activity
                </Text>

                <DataTable data={data} columns={activityColumns} />
            </Box>

            <TimelineDialog
                open={timelineFile !== null}
                onClose={() => setTimelineFile(null)}
                fileName={timelineFile || ""}
                events={timelineFile && fakeEventsMap[timelineFile] ? fakeEventsMap[timelineFile] : fakeEventsMap["default"]}
            />

            <ConfirmDeleteDialog
                open={fileToDelete !== null}
                fileName={fileToDelete || ""}
                onClose={() => setFileToDelete(null)}
                onConfirm={() => {
                    setData(d => d.filter(item => item.file !== fileToDelete));
                    setFileToDelete(null);
                }}
            />
        </Flex>
    );
};

export default Dashboard;
