import { Flex, Text, Box, HStack, IconButton, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { DataTable, type ColumnDef } from "../components/DataTable";
import { TimelineDialog } from "../components/TimelineDialog";
import { ConfirmDeleteDialog } from "../components/ConfirmDeleteDialog";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { Tooltip } from "../components/ui/tooltip";

const initialInboxData = [
    { name: "Sara Smith", file: "Q3_Report.pdf", sender: "sara@shuttlr.com", date: "Mar 25", status: "New", statusColor: "blue" },
    { name: "Design Team", file: "Design_Assets.zip", sender: "design@shuttlr.com", date: "Mar 24", status: "Downloaded", statusColor: "green" },
    { name: "Billing Dept", file: "Invoice_032.pdf", sender: "billing@company.com", date: "Mar 20", status: "Expired", statusColor: "gray" },
];

const fakeEvents = [
    { title: "File Received", description: "File was sent securely to you.", time: "2 days ago" },
    { title: "File Viewed", description: "You opened the link.", time: "1 day ago" }
];

const Inbox = () => {
    const [data, setData] = useState(initialInboxData);
    const [timelineFile, setTimelineFile] = useState<string | null>(null);
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);

    const inboxColumns: ColumnDef<typeof initialInboxData[0]>[] = [
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
        { key: "sender", header: "Sender", flex: 2 },
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
            gap={6}
        >
            <Text fontSize="2xl" fontWeight="semibold">
                Inbox
            </Text>

            <Box border="1px solid" borderColor="gray.200" borderRadius="xl" p={6}>
                <DataTable data={data} columns={inboxColumns} />
            </Box>

            <TimelineDialog
                open={timelineFile !== null}
                onClose={() => setTimelineFile(null)}
                fileName={timelineFile || ""}
                events={fakeEvents}
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

export default Inbox;
