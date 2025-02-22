import axios from "axios"
import { CourseIdInput } from "../types"
import { throwErr } from "./helper"

const baseUrl = 'localhost:8000/tables/course.php'

export const listCourse = async() => {
    try {
        const response = await axios.get(`${baseUrl}?action=list-course`)
        return response.data
    } catch (error) {
        throw throwErr(error as Error, "Failed to Get courses")
    }
}

export  const getCourse = async({course_id}:CourseIdInput) => {
    try {
        const response = await axios.post(`${baseUrl}?action=get-course`,{
            data: {course_id}
        })
        return response.data
    } catch (error) {
        throw throwErr(error as Error, "Failed to Get Course")   
    }
}


