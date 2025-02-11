    import axios from "axios"
    import { User } from "./types";

    const baseUrl = 'http://localhost:8000/tables/users.php';



    export const getAllUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}?action=get-all-users`);
            return response.data as User[];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || "Failed to fetch users");
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    };
    