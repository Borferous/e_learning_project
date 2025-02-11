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

export const deleteUser = async (user_id: number) => {
    try {
        const response = await axios.delete(`${baseUrl}?action=delete-user`, {
            data: { user_id }
        })
        return response
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to delete user");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const createUser = async ({
    name,
    password,
    address,
    email,
    user_role
}: {
    name: string,
    password: string,
    address: string,
    email: string,
    user_role: string
}) => {
    try {
        const response = await axios.post(`${baseUrl}?action=create-user`, {
            name, password, address, email, user_role
        })
        return response
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to Create user");
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const updateUser = async ({
    user_id,
    name,
    password,
    address,
    email,
    user_role
}:{ 
    user_id: string,
    name: string,
    password: string,
    address: string,
    email: string,
    user_role: string
}) => {
    try {
        const response = await axios.post(`${baseUrl}?action=update-user`, {
            user_id, name, password, address, email, user_role
        })
        return response
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to Update user");
        } else {
            throw new Error("An unknown error occurred");
        }       
    }
}