import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartContainer from "../app/components/cart/CartContainer";
import * as CartItemsRequest from "../app/api/CartItemsRequest";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from "redux";

describe("Cart Container Tests", () => {
    const initialState = { jwt: { token: "jwtkey" }, user: { info: { sub: "user" } } };
    const mockStore = configureStore();
    let store: Store;

    it("Test Cart Items displayed", () => {
        store = mockStore(initialState)

        const getCartItems = jest.spyOn(CartItemsRequest, 'getCartItems');
        const result = [{ "productId": 1, "name": "Apple", "price": 2.5, "cartId": 1, "quantity": 5 }];
        getCartItems.mockReturnValue(Promise.resolve(JSON.stringify(result)));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CartContainer />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => { // NOSONAR: No need to await.
            const title = screen.getByText("Online Shop");
            expect(title).toBeInTheDocument();

            const copyright = screen.getByText("Copyright");
            expect(copyright).toBeInTheDocument();

            const productTitle = screen.getByText("Apple");
            expect(productTitle).toBeInTheDocument();

            const productPrice = screen.getByText("Price: 2.5");
            expect(productPrice).toBeInTheDocument();
        })
    });
});