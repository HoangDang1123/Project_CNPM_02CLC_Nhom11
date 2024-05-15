import api from 'API';
import get from 'lodash/get'
const CART_URL = "/v1/api/cart"

export async function addToCart(data, userId, accessToken) {
    try {
        const respone = await api.post(`${CART_URL}`, data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "x-client-id": userId,
                "authorization": accessToken,
            }
        })
        return respone.data.metadata
    } catch (error) {
        const errorMessage = get(error, 'data.error.message', '') || JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function getListCart(userId, accessToken) {
    try {
        const respone = await api.post(`${CART_URL}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "x-client-id": userId,
                "authorization": accessToken,
            }
        })
        return respone.data.metadata
    } catch (error) {
        const errorMessage = get(error, 'data.error.message', '') || JSON.stringify(error);
        throw new Error(errorMessage);
    }
}
