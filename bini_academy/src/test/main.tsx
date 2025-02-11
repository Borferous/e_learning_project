import { Center, Flex } from "@mantine/core"
import { UserPage } from "./user"

export const MainTest = () => {
    return (
        <Center className="w-screen p-2">
            <Flex direction={"column"} className="w-full">
                <UserPage />
            </Flex>
        </Center>
    )
}

