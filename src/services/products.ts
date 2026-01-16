import api from './api';

export async function getProductCategories() {
    const response = await api.get('/products/categories');

    return response.data;
}

