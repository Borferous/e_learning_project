import { UserIdInput, CreateUserInput } from "./types";

export const apiUrl = "http://localhost:8000/tables/users.php";

export const userEndpoint = {
    getAllUsers: () => `${apiUrl}?action=get-all-users`,
    getUserById: ({ userId }: UserIdInput) => `${apiUrl}?action=get-user-by-id&user_id=${userId}`,
    createUser: ({ name, password, address, user_role, email }: CreateUserInput) => `${apiUrl}?action=create-user&name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}&address=${encodeURIComponent(address)}&user_role=${encodeURIComponent(user_role)}&email=${encodeURIComponent(email)}`,
    deleteUser: ({userId}: UserIdInput) => `${apiUrl}?action=delete-user&user_id=${userId}`,
};

