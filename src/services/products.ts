import api from './api';

export async function getProductCategories() {
    const response = await api.get('/product/categories');

    return response.data;
}

