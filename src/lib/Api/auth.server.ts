import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
// import type { SuccessResponse } from '$lib/Models/api.model';
import type { User } from '$lib/Models/user.model';
import { Api } from './api.server';

// Class for Buffer Request Api
export default class AuthApi extends Api {
    login = async (email: User['email'], password: string): Promise<ApiResponse<{ user: User } & { accessToken: string }> & { refreshToken: string | null }> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password })
                }
            );

            const allCookies = response.headers.getSetCookie();
            const refreshTokenCookie = allCookies.find((cookie) => cookie.startsWith('refreshToken='));
            const refreshToken = refreshTokenCookie ? refreshTokenCookie.split('=')[1].split(';')[0] : null;

            // Convert response to json and return
            const data: ApiResponse<{ user: User } & { accessToken: string }> = await response.json();
            return { ...data, refreshToken };
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Login : ' + error);
            throw new Error('Error Login : ' + error);
        }
    };

    register = async (email: User['email'], password: string, password_confirmation: string): Promise<ApiResponse> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, password_confirmation }),
                    credentials: 'include'
                }
            );

            // Convert response to json and return
            const data: ApiResponse = await response.json();
            return data;
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Register : ' + error);
            throw new Error('Error Register : ' + error);
        }
    };
}