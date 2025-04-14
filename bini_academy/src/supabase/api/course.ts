import { Course, Major } from "../../types";
import supabase from "../supabaseClient";
import { getCurrentUser } from "./user";

export const getCourses = async () => {
    const { data, error} = await supabase
        .from('courses')
        .select('*');
    if (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
    return data as Course[];
}

export const getMajorOfUser = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Cannot get user");
    }
    const { data, error } = await supabase
        .from('majors')
        .select('*')
        .eq('id', user.enrolled_course_id)
        .single()
    if (error) {
        throw new Error(`Error fetching major of user: ${error.message}`);
    }
    return data;
}

export const getMajor = async (courseId: string) => {
    const { data, error } = await supabase
        .from('majors')
        .select('*')
        .eq('id', courseId);
    if (error) {
        throw new Error(`Error fetching majors: ${error.message}`);
    }
    return data ;
}

export const getAllMajor = async (): Promise<Major[]> => {
    const { data, error } = await supabase
        .from('majors')
        .select('*');

    if (error) {
        throw new Error(`Error fetching majors: ${error.message}`);
    }

    if (!data) return [];

    return data.map((major) => {
        const { data: urlData } = supabase
            .storage
            .from('major-thumbnail')
            .getPublicUrl(major.major_thumbnail); // assuming it's a path like 'public/something.png'

        return {
            ...major,
            thumbnail: urlData.publicUrl,
        };
    });
};

export const getCoursesAndMajor = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, majors(*)');
    if (error) {
        throw new Error(`Error fetching courses and majors: ${error.message}`);
    }
    if (data) {
        const formatted = await Promise.all(data.map(async (course) => ({
            degree: course.degree,
            majors: await Promise.all(course.majors.map(async (major: Major) => {
                const { data: urlData } = major.thumbnail
                    ? supabase
                        .storage
                        .from('major-thumbnail')
                        .getPublicUrl(major.thumbnail)
                    : { data: null };
                
                return {
                    id: major.id,
                    title: major.title,
                    subtitle: major.subtitle,
                    price: major.price,
                    thumbnail: urlData?.publicUrl ?? '',
                };
            }))
        })));
        console.log("Formatted data: ", formatted);
        return formatted;
    }
}
