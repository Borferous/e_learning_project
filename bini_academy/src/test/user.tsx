import { Button, Card, Center, Fieldset, List, ListItem } from "@mantine/core"
import { useState } from "react"
import { getAllUser } from "../api"
import { User } from "../types"

export const UserPage = () => {
    return (
        <Center>
            <GetAllUser />
        </Center>
    )
}

export const GetAllUser = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            const response = await getAllUser();
            console.log(response)
            setUsers(response);
        } catch (err) {
            setError("Failed to fetch users" + err);
        }
    };

    return (
        <Fieldset legend="Get All Users">
            <Button onClick={fetchUser}>Fetch Users</Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <List>
                {users && users.map((user, key) => (
                    <ListItem key={key}>
                        <Card>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Fieldset>
    );
};
