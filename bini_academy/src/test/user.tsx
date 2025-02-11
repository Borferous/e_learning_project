import { Button, Center, Fieldset, Flex, Select, Table, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { createUser, deleteUser, getAllUser, updateUser } from "../api"
import { User, UserRoleLabel } from "../types"

export const UserPage = () => {
    return (
        <Center>
            <Flex direction={"column"}>
                <GetAllUser />
                <CreateUserForm/>
            </Flex>
        </Center>
    )
}

export const GetAllUser = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await getAllUser();
            setUsers(response);
            setCurrentPage(1);
            setEditingUser(null);
        } catch (err) {
            setError("Failed to fetch users: " + err);
        }
    };

    return (
        <Fieldset legend="Get All Users">
            <Button onClick={fetchUser}>Fetch Users</Button>
            {editingUser ? (
                <EditUserForm user={editingUser} onSuccess={fetchUser} onCancel={() => setEditingUser(null)} />
            ) : (
                <>
                    {users?.length ? (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Address</Table.Th>
                                    <Table.Th>Role</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {users.slice((currentPage - 1) * 5, currentPage * 5).map((user) => (
                                    <Table.Tr key={user.user_id}>
                                        <Table.Td>{user.name}</Table.Td>
                                        <Table.Td>{user.email}</Table.Td>
                                        <Table.Td>{user.address}</Table.Td>
                                        <Table.Td>{user.user_role}</Table.Td>
                                        <Table.Td>
                                            <Button onClick={() => setEditingUser(user)} className="mr-1">Edit</Button>
                                            <Button onClick={() => deleteUser(parseInt(user.user_id))}>Delete</Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    ) : (
                        <p>No Users Found</p>
                    )}
                </>
            )}
        </Fieldset>
    );
};


const CreateUserForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [user_role, setUserRole] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            await createUser({ name, password, address, email, user_role });
            setSuccess("User created successfully!");
            setError(null);
            setName("");
            setPassword("");
            setAddress("");
            setEmail("");
            setUserRole("");
        } catch (err) {
            setError("Failed to create user: " + err);
            setSuccess(null);
        }
    };

    return (
        <Fieldset legend="Create User">
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Select
                label="User Role"
                value={user_role}
                onChange={(value) => setUserRole(value!)}
                data={UserRoleLabel}
                required
            />

            <Button onClick={handleSubmit} mt="md">
                Create User
            </Button>
        </Fieldset>
    );
};

interface EditUserFormProps {
    user: User | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditUserForm = ({ user, onSuccess, onCancel }: EditUserFormProps) => {
    const [name, setName] = useState(user?.name || "");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState(user?.address || "");
    const [email, setEmail] = useState(user?.email || "");
    const [user_role, setUserRole] = useState(user?.user_role || "");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAddress(user.address);
            setEmail(user.email);
            setUserRole(user.user_role);
            setPassword(""); // Reset password field
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!user) return;

        try {
            await updateUser({
                user_id: user.user_id.toString(),
                name,
                password: password === "" ? user.password : password,
                address,
                email,
                user_role,
            });
            onSuccess();
        } catch (err) {
            setError("Failed to update user: " + err);
        }
    };

    return (
        <Fieldset legend="Edit User">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextInput label="New Password (Leave Blank to Keep Current)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Select label="User Role" value={user_role} onChange={(value) => setUserRole(value!)} data={UserRoleLabel} required />
            <Button onClick={handleSubmit} mt="md">Update User</Button>
            <Button onClick={onCancel} color="red" mt="md" ml="sm">Cancel</Button>
        </Fieldset>
    );
};
