import type { User } from "./user.model";

export interface Product {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
    user_id: string;
    user: User
}