import { Fieldset, Button, Center } from "@mantine/core";
import axios from "axios";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const LoginPage = () => {
    const [showUsers, setShowUsers] = useState(false);

    const fetchUsers = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds
        const response = await axios.get("http://localhost:8000/tables/users.php");
        return response.data.data;
    };

    const { data: users, refetch, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        enabled: false, // Prevent auto-fetching
    });

    const handleClick = () => {
        setShowUsers(true);
        refetch(); // Fetch users on button click
    };

    return (
        <Center>
            <Fieldset legend="User List">
                <Button onClick={handleClick} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Show Users"}
                </Button>
                {error && <p style={{ color: "red" }}>Error fetching users.</p>}
                {showUsers && users && (
                    <ul>
                        {users.map((user: { user_id: Key | null | undefined; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                            <li key={user.user_id}>{user.username}</li>
                        ))}
                    </ul>
                )}
            </Fieldset>
        </Center>
    );
};
