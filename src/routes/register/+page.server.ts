import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import AuthApi from '$lib/Api/auth.server';
import { message } from 'sveltekit-superforms/server';


const newRegisterSchema = z.object({
    email: z.string()
        .email('Email invalide'),
    password: z.string()
        .min(5, 'Le mot de passe doit contenir au moins 8 caractères')
        .max(6, 'Le mot de passe doit contenir au moins 30 caractères'),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"]
});

export const load = (async (event) => {
    const user = event.locals.user;
    if (user) {
        throw redirect(303, '/auth');
    }

    const form = await superValidate(event, zod(newRegisterSchema));
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    register: async (event) => {
        const form = await superValidate(event, zod(newRegisterSchema));
        const fetch = event.fetch

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const api = new AuthApi(fetch)
        const res = await api.register(form.data.email, form.data.password, form.data.password_confirmation)

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
