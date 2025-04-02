import type { Handle, HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import UserApi from '$lib/Api/user.server';

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('access_token');

    if (!token) return await resolve(event);

    if (event.locals.user) {

        return await resolve(event);
    }

    const api = new UserApi(event.fetch);
    const userInfo = await api.getInfo();

    // If error in request
    if ('error' in userInfo) {
        event.cookies.delete('access_token', { path: '/' });
        event.locals.user = null;
    } else {
        event.locals.user = userInfo.data;
    }

    return await resolve(event);
};

// ! HANDLE FETCH
export const handleFetch = (async ({ request, fetch, event }) => {
    const apiUrl = new URL(env.API_URL!);
    const requestUrl = new URL(request.url);

    if (requestUrl.href.startsWith(apiUrl.href)) {
        request.headers.set('x-api-key', env.API_KEY!);

        const jwt = event.cookies.get('access_token');
        if (jwt) {
            request.headers.set('Authorization', `Bearer ${jwt}`);
        }
    }

    // Return the fetch request
    return fetch(request);
}) satisfies HandleFetch;
