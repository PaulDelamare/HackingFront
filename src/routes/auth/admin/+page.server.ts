import UserApi from '$lib/Api/user.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const apiUser = new UserApi(fetch);
    const users = await apiUser.getAllUsers();

    if ("error" in users) {
        throw error(404, 'Users not found')
    }
    return {
        users: users.data
    };
}) satisfies PageServerLoad;