import { Subject } from "../../types";
import supabase from "../supabaseClient";
import { getCurrentUser } from "./user";

export const getSubjects = async(majorId: string) => {
    const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("major_id", majorId)
    if (error) {
        throw new Error(`Error fetching subjects: ${error.message}`);
    }
    return data;
}

export const getMySubjects = async() => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Cannot get user")
    };
    if (!user.enrolled_course_id) {
        throw new Error("User is not enrolled in any course")
    };
    const {data, error} = await supabase
        .from('subjects')
        .select('*')
        .eq('major_id', user.enrolled_course_id)

    if (error) {
        throw new Error(`Error fetching subjects: ${error.message}`);
    }
    console.log('Subjects', data)
    return data as Subject[];
}



