import { Course, Major } from "../../types";
import supabase from "../supabaseClient";

export const getCourses = async () => {
    const { data, error} = await supabase
        .from('courses')
        .select('*');
    if (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
    return data as Course[];
}

export const getMajor = async (courseId: string) => {
    const { data, error } = await supabase
        .from('majors')
        .select('*')
        .eq('id', courseId);
    if (error) {
        throw new Error(`Error fetching majors: ${error.message}`);
    }
    return data;
}

export const getCoursesAndMajor = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, majors(*)');
    if (error) {
        throw new Error(`Error fetching courses and majors: ${error.message}`);
    }
    if (data) {
        const formatted = data.map((course) => ({
            degree: course.degree,
            majors: course.majors.map((major: Major) => ({id: major.id,title: major.title, subtitle: major.subtitle, price: major.price}))
        }))
        console.log("Formatted data: ", formatted);
        return formatted;
    }
}
