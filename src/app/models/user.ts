export interface User {
    uid: string;
    name: string;
    bloq:boolean;
    email: string;
    photoURL: string;
    address?: string;
    admin?:  boolean;
    obs?: string;
    createdAt: number;
    updatedAt: number;
 }