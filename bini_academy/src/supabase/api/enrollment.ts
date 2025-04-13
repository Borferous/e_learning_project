import { UserRole } from "../../types";
import supabase from "../supabaseClient";

export const enrollUser = async(userId: string, majorId: string, payment: number) => {
    const { data: majorData, error: majorError } = await supabase
        .from('majors')
        .select('price')
        .eq('id', majorId)
        .single();
    if (majorError) {
        throw new Error(`Error fetching major info: ${majorError.message}`);
    }
    if (!majorData) {
        throw new Error('Selected major does not exist.');
    }
    if (payment < majorData.price) {
        throw new Error('Insufficient payment.');
    }
    const {data, error} = await supabase 
        .from('users')
        .update({
            enrolled_course_id: majorId,
        })
        .eq('user_role', UserRole.Student)
        .eq('id', userId)
        .is('enrolled_course_id', null)
    if (error) {
        throw new Error(`Error enrolling user: ${error.message}`);
    }

    return data;
}

export const unenrollUser = async(userId: string) => {
    const {data, error} = await supabase
        .from('users')
        .update({
            enrolled_course_id: null,
        })
        .eq('user_role', UserRole.Student)
        .eq('id', userId)
    if (error) {
        throw new Error(`Error unenrolling user: ${error.message}`);
    }
    return data;
}

export const getEnrolledCourse = async(userId: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('enrolled_course_id')
        .eq('id', userId)
    if (error) {
        throw new Error(`Error fetching enrolled course: ${error.message}`);
    }
    console.log('Course',data)
    return data
}


