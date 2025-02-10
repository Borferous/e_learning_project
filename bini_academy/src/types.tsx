export interface UserIdInput {
    userId: number;
}

export interface CreateUserInput {
    name: string;
    password: string;
    address: string;
    user_role: string;
    email: string;
}

export interface User {
    user_id: string,
    name: string,
    password: string,
    address: string,
    user_role: string,
    email: string,
    profile_picture: string,
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
