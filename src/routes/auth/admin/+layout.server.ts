import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

    const user = locals.user;

    if (!user || user.role.role_name !== "admin") {
        throw error(404, 'User not found');
    }

    return {};
}) satisfies LayoutServerLoad;