import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const user = locals.user;

    if (!user) {
        throw redirect(303, '/');
    }
    return {
        user
    };
}) satisfies LayoutServerLoad;