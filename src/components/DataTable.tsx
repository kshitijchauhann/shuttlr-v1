import { Flex, Text, Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface ColumnDef<T> {
    key: string;
    header: string;
    flex?: string | number;
    render?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
    return (
        <Flex flexDir="column" w="100%">
            {/* Header Row */}
            <Flex py={3} borderBottom="1px solid" borderColor="gray.200">
                {columns.map((col, index) => (
                    <Text
                        key={col.key || index}
                        flex={col.flex || 1}
                        fontSize="sm"
                        color="gray.600"
                    >
                        {col.header}
                    </Text>
                ))}
            </Flex>

            {/* Data Rows */}
            {data.map((item, rowIndex) => (
                <Flex
                    key={rowIndex}
                    py={4}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    align="center"
                >
                    {columns.map((col, colIndex) => (
                        <Box key={col.key || colIndex} flex={col.flex || 1}>
                            {col.render ? (
                                col.render(item)
                            ) : (
                                <Text fontSize="sm" color={colIndex === 0 ? "gray.800" : "gray.600"} fontWeight={colIndex === 0 ? "medium" : "normal"}>
                                    {String((item as any)[col.key])}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Flex>
            ))}
        </Flex>
    );
}
