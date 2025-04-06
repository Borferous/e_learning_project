export interface User {
    user_id: string,
    name: string,
    password: string,
    address: string,
    user_role: string,
    email: string,
    profile_picture?: string,
    status: string
}

export enum ActiveStatus {
    Active = "active",
    Inactive = "inactive"
}

export const ActiveStatusLabel = [
    { value: ActiveStatus.Inactive, label: 'Inactive' },
    { value: ActiveStatus.Active, label: 'Active' },
]

export enum UserRole {
    Student = 'student',
    Admin = 'admin',
    Teacher = 'teacher'
}

export const UserRoleLabel = [
    { value: UserRole.Student, label: "Student" },
    { value: UserRole.Admin, label: "Admin" },
    { value: UserRole.Teacher, label: "Teacher" },
]

export interface Course {
    teacher_id: string,
    course_title: string,
    program_category: string,
    price: string | number,
    description: string,
    course_level: string,
    course_topic: string
}

export enum CourseCategory {
    Bachelor = 'bachelor',
    Diploma = 'diploma',
    Workshop = 'workshop',
    Others = 'others'
}

import {
    IconCertificate,
    IconPencil,
    IconBook
} from '@tabler/icons-react';


export const CourseCategoryLabel = [
    { value: CourseCategory.Bachelor, label: 'Bachelor Degrees', icon: IconBook },
    { value: CourseCategory.Diploma, label: 'Diploma & Certificate Programs', icon: IconCertificate },
    { value: CourseCategory.Workshop, label: 'Workshop & Masterclasses', icon: IconPencil },
    { value: CourseCategory.Others, label: 'Others', icon: IconBook },
]

export enum CourseLevel {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
}

export const CourseLevelLabel = [
    { value: CourseLevel.Beginner, label: "Beginner" },
    { value: CourseLevel.Intermediate, label: "Intermediate" },
    { value: CourseLevel.Advanced, label: "Advanced" },
]


export interface ProgramEvent {
    event_host: string,
    event_title: string,
    event_category: string,
    event_description: string,
    event_end_date: string,
    event_start_date: string,
    event_subtitle: string,
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Others = 'others'
}

export const GenderLabel = [
    { value: Gender.Male, label: "Male" },
    { value: Gender.Female, label: "Female" },
    { value: Gender.Others, label: "Others" },
]

export interface FileData {
    file_id: number;
    file_path: string;
    file_name: string;
}