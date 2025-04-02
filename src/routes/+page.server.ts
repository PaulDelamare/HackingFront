import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import AuthApi from '$lib/Api/auth.server';


const newLoginSchema = z.object({
    email: z.string()
        .email('Email invalide'),
    password: z.string()
        .min(5, 'Le mot de passe doit contenir au moins 8 caractères')
        .max(6, 'Le mot de passe doit contenir au moins 30 caractères')
})

export const load = (async (event) => {
    const user = event.locals.user;
    if (user) {
        throw redirect(303, '/auth');
    }

    const form = await superValidate(event, zod(newLoginSchema));
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async (event) => {
        const form = await superValidate(event, zod(newLoginSchema));
        const fetch = event.fetch

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const api = new AuthApi(fetch)
        const res = await api.login(form.data.email, form.data.password)

        if ("error" in res) {
            return message(form, res.error.message, {
                status: res.status
            });
        }

        event.cookies.set('refreshToken', res.refreshToken!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'strict' as const
        })

        event.cookies.set('access_token', res.data.accessToken, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

    },

    logout: async ({ cookies }) => {
        cookies.delete('access_token', { path: '/' });

        throw redirect(303, '/');
    }
}
