import axios from "axios"
import { User } from "../types";
import { throwErr } from "./helper";

const baseUrl = 'http://localhost:8000/tables/users.php';

export const getAllUser = async () => {
    try {
        const response = await axios.get(`${baseUrl}?action=get-all-users`)
        return response.data as User[];    
    } catch (error) {
        throw throwErr(error as Error, "Failed to Get Users")
    }    
};

export const deleteUser = async (user_id: number) => {
    try {
        const response = await axios.delete(`${baseUrl}?action=delete-user`, {
            data: { user_id }
        })
        return response
    } catch (error) {
        throw throwErr(error as Error, "Failed to Delete Users")
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
        throw throwErr(error as Error, "Failed to Create User")
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
        throw throwErr(error as Error, "Failed to Update User")
    }
}

export const loginUser = async ({
    email,
    password
} : {
    email: string,
    password: string
}) => {
    try {
        const response = await axios.post(`${baseUrl}?action=login-user`,{ email, password})
        return response
    } catch (error) {
        throw throwErr(error as Error, "Login Fail")
    }
}