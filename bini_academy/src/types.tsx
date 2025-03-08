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

import { 
    IconMusic, 
    IconOld, 
    IconBook, 
    IconMedal, 
    IconMasksTheater, 
    IconPhone,
    IconMessage,
} from '@tabler/icons-react';
  

export const CourseCategoryLabel = [
    {value: CourseCategory.Music, label: 'Music', icon: IconMusic},
    {value: CourseCategory.Dance, label: 'Dance', icon: IconOld},
    {value: CourseCategory.Acting, label: 'Acting and Theater', icon: IconMasksTheater},
    {value: CourseCategory.Technical, label: 'Techinical skill and Technology', icon: IconPhone},
    {value: CourseCategory.PhilippineArts, label: 'Philippine Arts and Heritage', icon: IconBook},
    {value: CourseCategory.Workshop, label: 'Short-term Workshop and Master classes', icon: IconBook},
    {value: CourseCategory.Certification, label: 'Certification and Diploma programs', icon: IconMedal},
    {value: CourseCategory.Mentorship, label: 'Mentorship and Career pathways', icon: IconMessage},
]


