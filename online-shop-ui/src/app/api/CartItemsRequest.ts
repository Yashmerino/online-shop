/*
 * MIT License
 *
 * Copyright (c) 2023 Artiom Bozieac
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { API_BASE_URL } from "../../env-config";

/**
 * API Request to get user's cart items.
 * @param token The JWT Token
 * @param username User's username.
 * @returns Response.
 */
export const getCartItems = async (token: string, username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem?&username=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    })

    if (response.status == 401) {
        return response;
    }

    return response.json();
}

/**
 * API Request to delete a cart item.
 * @param token The JWT Token.
 * @param id Cart item's ID.
 * @returns Response.
 */
export const deleteCartItem = async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status == 401) {
        return response;
    }

    return response.json();
}

/**
 * API Request to change quantity of a cart item.
 * @param token The JWT Token.
 * @param id Cart item's ID.
 * @param quantity Cart item's new quantity.
 * @returns Response.
 */
export const changeQuantity = async (token: string, id: number, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem/${id}/quantity?quantity=${quantity}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status == 401) {
        return response;
    }

    return response.json();
}