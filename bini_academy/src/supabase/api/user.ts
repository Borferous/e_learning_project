import { User } from '../../types'
import supabase from '../supabaseClient'

export const createUser = async (userForm: User) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ ...userForm }])
        .select()
    if (error) {
        throw new Error(`Error creating user: ${error.message}`)
    }
    return data
}

export const editUser = async (userForm: User) => {
    const { data, error } = await supabase
        .from('users')
        .update({ ...userForm })
        .eq('id', userForm.id)
        .select()
    if (error) {
        throw new Error(`Error updating user: ${error.message}`)
    }
    return data
}

export const deleteUser = async (userId: string) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)
        .select()
    if (error) {
        throw new Error(`Error deleting user: ${error.message}`)
    }
    return data
}

export const getAllUsers = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
    if (error) {
        throw new Error(`Error fetching users: ${error.message}`)
    }
    return data as User[]
}

export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
    if (error) {
        throw new Error(`Error logging in user: ${error.message}`);
    }
    localStorage.setItem('user', data.id);
    return data;
};

export const logoutUser = async () => {
    localStorage.removeItem('user');
}

export const getCurrentUser = async() => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', localStorage.getItem('user'))
        .single();
    if (error) {
        throw new Error(`Error fetching current user: ${error.message}`);
    }
    return data as User;
}

export const getUsername = async(userId: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();
    if (error) {
        throw new Error(`Error fetching username: ${error.message}`);
    }
    return data.name as string;
}


