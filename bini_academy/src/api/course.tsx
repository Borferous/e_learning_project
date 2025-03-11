import axios from "axios"
import { Course } from "../types";

const baseUrl = 'http://localhost:8000/tables/course.php';

export const listCourse = async() => {
    const response = await axios.get(`${baseUrl}?action=list-courses`)
    return response.data as Course[]
}

export const getCourse = async({course_id}:{course_id : number}) => {
    const response = await axios.post(`${baseUrl}?action=get-course`,{
        data: {course_id}
    })
    return response.data
}

export const setEditCourse = async(course_id : string | number) => {
    await axios.post(`${baseUrl}?action=set-edit-course`,{
        data: {course_id}
    })
}

export const getEditCourse = async() => {
    const response = await axios.get(`${baseUrl}?action=get-edit-course`)
    return response.data
}

export const createCourse = async({
    teacher_id,
    course_title,
    program_category,
    price,
    description,
    course_level,
    course_topic
} : Course) => {
    const response = await axios.post(`${baseUrl}?action=create-course`,{
        teacher_id, course_title, program_category, price, description, course_level, course_topic
    })
    return response.data
}

export const getCourseCount = async() => {
    const response = await axios.get(`${baseUrl}?action=get-course-count`)
    return response.data
}
