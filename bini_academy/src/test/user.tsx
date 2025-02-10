import { Button, Card, Center, Fieldset, Group, List, PasswordInput, TextInput, Notification, Flex, Select, NumberInput } from "@mantine/core"
import { userEndpoint } from "../api"
import axios from "axios"
import { useState } from "react"
import { User, UserRole, UserRoleLabel } from "../types"

export const UserPage = () => {
    return (
        <Center>
            <Flex direction={"column"}>
                <GetUser />
                <CreateUser />
                <DeleteUser />
            </Flex>
        </Center>
    )
}

const GetUser = () => {
    const [users, setUsers] = useState<User[] | null>(null)
    const GetAllUser = async () => {
        try {
            const response = await axios.get(userEndpoint.getAllUsers())
            console.log(response.data)
            setUsers(response.data)
        } catch (e) {
            console.log('Failed to fetch user')
        }
    }
    return (
        <div className="m-1">
            <Fieldset legend="Get All Users">
                <Button onClick={() => GetAllUser()}>Get</Button>
                <List className="p-1">
                    {users ? users.map((user, key) => (
                        <List.Item className="m-1" key={key}>
                            <Card className="w-full" withBorder>
                                <p>User ID: {user.user_id}</p>
                                <p>Name: {user.name}</p>
                            </Card>
                        </List.Item>
                    )) : <p>No Users Found</p>}
                </List>
            </Fieldset>
        </div>
    )
}

const CreateUser = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [userRole, setUserRole] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const handleCreateUser = async () => {
        try {
            const response = await axios.get(userEndpoint.createUser({
                name,
                password,
                address,
                user_role: userRole,
                email,
            }))
            setUser(response.data);
            setSuccess("User created successfully!");
            setError(null); // Clear any previous errors
        } catch (err) {
            setError("Failed to create user");
            setSuccess(null); // Clear success message
        }
    };

    return (
        <div className="m-1">
            <Fieldset legend="Create User">
                <TextInput
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <TextInput
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <Select
                    label="User Role"
                    value={userRole}
                    data={UserRoleLabel}
                    onChange={(e) => setUserRole(e as UserRole)}
                    required
                />
                <TextInput
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Group mt="md">
                    <Button onClick={handleCreateUser}>Create User</Button>
                </Group>
                {user && <p>{user.name}</p>}
                {error && <Notification color="red" title="Error">{error}</Notification>}
                {success && <Notification color="green" title="Success">{success}</Notification>}
            </Fieldset>
        </div>
    );
};

const DeleteUser = () => {

    const [userId, setUserId] = useState<number | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const handleDelete = async () => {
        try {
            if (userId != null) {
                const response = await axios.delete(userEndpoint.deleteUser({ userId: userId }))
                setSuccess(true)
            }
        } catch (e) {
            setSuccess(false)
            console.log('Failed to delete User')
        }
    }

    return (
        <Fieldset legend="Delete User">
            <NumberInput
                label='User Id'
                onChange={(e) => setUserId(e as number)}
            />
            <Button onClick={() => handleDelete()}> Delete</Button>
            {success && <Notification color="green" title="Success">Succesfully Deleted User</Notification>}
        </Fieldset>
    )
}