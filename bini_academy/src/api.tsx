import { UserIdInput } from "./types";

export const apiUrl = "http://localhost:8000/tables/users.php";

export const userEndpoint = {
    getAllUsers: () => `${apiUrl}?action=get-all-users`,
    getUserById: ({userId} : UserIdInput) => `${apiUrl}?action=get-user-by-id&user_id=${userId}`,
}