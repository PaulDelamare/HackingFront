import ProductApi from '$lib/Api/product.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms/server';

const newProductSchema = z.object({
    id_product: z.string().uuid()
})

export const load = (async (event) => {
    const apiProduct = new ProductApi(event.fetch)
    const products = await apiProduct.findAllProduct()
    if ("error" in products) {
        throw error(404, 'Products not found')
    }

    const form = await superValidate(event, zod(newProductSchema));

    return {
        products: products.data,
        form
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    deleteProduct: async (event) => {
        const form = await superValidate(event, zod(newProductSchema));
        const fetch = event.fetch

        if (!form.valid) {
            return fail(400, {
                form
            })
        }

        const api = new ProductApi(fetch)
        const res = await api.deleteProduct(form.data.id_product)

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