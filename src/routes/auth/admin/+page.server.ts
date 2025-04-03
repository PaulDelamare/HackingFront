import UserApi from '$lib/Api/user.server';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const newDeleteSchema = z.object({
    id: z.string().uuid()
})

export const load = (async (event) => {

    const apiUser = new UserApi(event.fetch);
    const users = await apiUser.getAllUsers();

    if ("error" in users) {
        throw error(404, 'Users not found')
    }

    const form = await superValidate(event, zod(newDeleteSchema));

    return {
        users: users.data,
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    deleteUser: async (event) => {
        const form = await superValidate(event, zod(newDeleteSchema));
        const fetch = event.fetch

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const api = new UserApi(fetch)
        const res = await api.deleteUser(form.data.id)

        if ("error" in res) {
            return message(form, res.error.message, {
                status: res.status
            });
        }

        return message(form, {
            success: true
        })
    },
}