import { User } from '../../types'
import supabase from '../supabaseClient'

export const signupUser = async (userForm : User) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{...userForm}])
        .select()
    if (error) {
        throw new Error(`Error creating user: ${error.message}`)
    }
    return data
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
    return data;
};

