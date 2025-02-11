export interface UserIdInput {
    userId?: number | null;
}

export interface CreateUserInput {
    name?: string | null;
    password?: string | null;
    address?: string | null;
    user_role?: string | null;
    email?: string | null;
}

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

export enum ResponseStatus {
    Success = 'success',
    Error = 'error'
}