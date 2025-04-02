import type { Role } from "./role.model";

export interface User {
    id: string;
    email: string;
    role_id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    role: Role;
}