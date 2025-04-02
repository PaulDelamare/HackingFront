import { env } from '$env/dynamic/private';
import type { ApiResponse } from '$lib/Models/response.model';
// import type { SuccessResponse } from '$lib/Models/api.model';
import type { User } from '$lib/Models/user.model';
import { Api } from './api.server';

// Class for Buffer Request Api
export default class UserApi extends Api {
    getInfo = async (): Promise<ApiResponse<User>> => {
        try {
            // Call api
            const response = await this.fetch(
                `${env.API_URL}user/get-info`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            // Convert response to json and return
            const data: ApiResponse<User> = await response.json();
            return { ...data };
        } catch (error) {

            // If an error occur, log error and return error
            console.error('Get info : ' + error);
            throw new Error('Error Get info : ' + error);
        }
    };

    getAllUsers = async (): Promise<ApiResponse<User[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}users`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );


            const data: ApiResponse<User[]> = await response.json();

            return { ...data };
        } catch (error) {
            console.error('Get all Users : ' + error);
            throw new Error('Error Get all Users : ' + error);
        }
    };

    deleteUser = async (id: User['id']): Promise<ApiResponse> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}user/${id}`,
                {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse = await response.json();

            return { ...data };
        } catch (error) {
            console.error('Delete User : ' + error);
            throw new Error('Error Delete User : ' + error);
        }
    }
}