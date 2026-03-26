import { Flex, Text, Box, HStack, IconButton, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { DataTable, type ColumnDef } from "../components/DataTable";
import { TimelineDialog } from "../components/TimelineDialog";
import { ConfirmDeleteDialog } from "../components/ConfirmDeleteDialog";
import { FiClock, FiTrash2 } from "react-icons/fi";
import { Tooltip } from "../components/ui/tooltip";

const initialSentData = [
    { name: "Mike Johnson", file: "Proposal_Final.pdf", recipient: "mike@gmail.com", date: "Mar 22", status: "Pending", statusColor: "orange" },
    { name: "Sara Smith", file: "Contract_v2.pdf", recipient: "sara@shuttlr.com", date: "Mar 21", status: "Downloaded", statusColor: "green" },
    { name: "Legal Dept", file: "NDA_signed.pdf", recipient: "legal@firm.com", date: "Mar 19", status: "Downloaded", statusColor: "green" },
];

const fakeEvents = [
    { title: "File Sent", description: "You sent the file successfully.", time: "Mar 22, 10:00 AM" },
    { title: "File Viewed", description: "Recipient has viewed the file.", time: "Mar 22, 02:30 PM" }
];

const Sent = () => {
    const [data, setData] = useState(initialSentData);
    const [timelineFile, setTimelineFile] = useState<string | null>(null);
    const [fileToDelete, setFileToDelete] = useState<string | null>(null);

    const sentColumns: ColumnDef<typeof initialSentData[0]>[] = [
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
        { key: "recipient", header: "Recipient", flex: 2 },
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
                Sent
            </Text>

            <Box border="1px solid" borderColor="gray.200" borderRadius="xl" p={6}>
                <DataTable data={data} columns={sentColumns} />
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

export default Sent;
