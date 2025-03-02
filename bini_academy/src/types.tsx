export interface User {
    user_id: string,
    name: string,
    password: string,
    address: string,
    user_role: string,
    email: string,
    profile_picture?: string,
}

export enum UserRole {
    Student = 'student',
    Admin = 'admin',
    Teacher = 'teacher'
}

export const UserRoleLabel = [
    {value: UserRole.Student , label: "Student"},
    {value: UserRole.Admin , label: "Admin"},
    {value: UserRole.Teacher , label: "Teacher"},
]

export enum CourseCategory {
    Music = 'music',
    Dance = 'dance',
    Acting = 'acting',
    Technical = 'technical',
    PhilippineArts = 'philippineArt',
    Workshop = 'workshop',
    Certification = 'certification',
    Mentorship = 'mentorship',
}

export const CourseCategoryLabel = [
    {value: CourseCategory.Music, label: 'Music'},
    {value: CourseCategory.Dance, label: 'Dance'},
    {value: CourseCategory.Acting, label: 'Acting and Theater'},
    {value: CourseCategory.Technical, label: 'Techinical skill and Technology'},
    {value: CourseCategory.PhilippineArts, label: 'Philippine Arts and Heritage'},
    {value: CourseCategory.Workshop, label: 'Short-term Workshop and Master classes'},
    {value: CourseCategory.Certification, label: 'Certification and Diploma programs'},
    {value: CourseCategory.Mentorship, label: 'Mentorship and Career pathways'},
]


