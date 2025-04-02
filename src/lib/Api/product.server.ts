import { env } from '$env/dynamic/private';
import type { Product } from '$lib/Models/product.model';
import type { ApiResponse } from '$lib/Models/response.model';
import { Api } from './api.server';

export default class ProductApi extends Api {
    findAllProduct = async (): Promise<ApiResponse<Product[]>> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}products`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            );

            const data: ApiResponse<Product[]> = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Find All Product : ' + error);
            throw new Error('Find All Product : ' + error);
        }
    };

    deleteProduct = async (id: string): Promise<ApiResponse> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}product/${id}`,
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

            console.error('Find All Product : ' + error);
            throw new Error('Find All Product : ' + error);
        }
    }

    createProduct = async (title: string, description: string): Promise<ApiResponse> => {
        try {
            const response = await this.fetch(
                `${env.API_URL}product`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ title, description })
                }
            );

            const data: ApiResponse = await response.json();
            return { ...data };
        } catch (error) {

            console.error('Find All Product : ' + error);
            throw new Error('Find All Product : ' + error);
        }
    }
}