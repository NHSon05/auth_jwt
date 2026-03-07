export interface User{
    _id: string;
    username: string;
    email:string;
    password: string;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
    phone?: string;
    createAt?: string;
    updatedAt?: string
}