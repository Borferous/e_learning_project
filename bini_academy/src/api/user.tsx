import axios from "axios"
import { User, UserRole } from "../types";

const baseUrl = 'http://localhost:8000/tables/users.php';

export const getAllUser = async () => {
    const response = await axios.get(`${baseUrl}?action=get-all-users`)
    return response.data as User[];    
};

export const deleteUser = async (user_id: string) => {
    const response = await axios.delete(`${baseUrl}?action=delete-user`, {
        data: { user_id }
    })
    return response
}

export const getCurrentUser = async() => {
    const response = await axios.get(`${baseUrl}?action=get-current-user`,{
        withCredentials: true
    })
    return response.data as User
}

export const getUserRole = async() => {
    const response = await axios.get(`${baseUrl}?action=get-current-user`,{
        withCredentials: true
    })
    return response.data.user_role as UserRole
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
    const response = await axios.post(`${baseUrl}?action=create-user`, {
        name, password, address, email, user_role
    })
    return response
}

export const updateUser = async ({
    user_id,
    name,
    password,
    address,
    email,
    user_role,
    status
}:{ 
    user_id: string,
    name: string,
    password: string,
    address: string,
    email: string,
    user_role: string,
    status: string,
}) => {
    const response = await axios.post(`${baseUrl}?action=update-user`, {
        user_id, name, password, address, email, user_role, status
    })
    return response
}

export const loginUser = async ({
    email,
    password
} : {
    email: string,
    password: string
}) => {
    const response = await axios.post(`${baseUrl}?action=login-user`,{ email, password})
    return response.data.user
}