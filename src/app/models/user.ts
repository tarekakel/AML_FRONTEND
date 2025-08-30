export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    is_active: boolean,
    is_blocked: boolean,
    is_deleted: boolean,
    avatar_url: string,
    first_name: string,
    last_name: string,
}

export interface CurrentUserInfo {
    user: User;
    groups: string[],
    permissions: string[],
}