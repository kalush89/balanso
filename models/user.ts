//export type Role = 'free' | 'premium' | 'admin';

export interface User {
    uid: string;
    displayName: string;
    //role: Role;
    email: string;
}
