import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms/server';
import ProductApi from '$lib/Api/product.server';


const newProductSchema = z.object({
    title: z.string(),
    description: z.string()
})

export const load = (async (event) => {

    const form = await superValidate(event, zod(newProductSchema));

    return {
        form
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    addProduct: async (event) => {
        const form = await superValidate(event, zod(newProductSchema));
        const fetch = event.fetch

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const api = new ProductApi(fetch)
        const res = await api.createProduct(form.data.title, form.data.description)

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
