import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartContainer from "../app/components/cart/CartContainer";
import * as CartItemsRequest from "../app/api/CartItemsRequest";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from "redux";

describe("Cart Container Tests", () => {
    const initialState = { jwt: { token: "jwtkey" }, username: { sub: "user" }, roles: { roles: { roles: [{ id: 1, name: "USER" }] } } };
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

    it("Test no rights to access page as Seller", () => {
        const newState = { jwt: { token: "jwtkey" }, username: { sub: "user" }, roles: { roles: { roles: [{ id: 2, name: "SELLER" }] } } };
        store = mockStore(newState)

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
            const productPrice = screen.getByText("You don't have rights to access this page.");
            expect(productPrice).toBeInTheDocument();
        })
    });

    it("Test delete cart item", () => {
        store = mockStore(initialState)

        const getCartItems = jest.spyOn(CartItemsRequest, 'getCartItems');
        const result = [{ "productId": 1, "name": "Apple", "price": 2.5, "cartId": 1, "quantity": 5 }];
        getCartItems.mockReturnValue(Promise.resolve(JSON.stringify(result)));

        const deleteCartItem = jest.spyOn(CartItemsRequest, 'deleteCartItem');
        deleteCartItem.mockReturnValue(Promise.resolve({ "status": 200, "message": "Cart item successfully deleted!" }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CartContainer />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => { // NOSONAR: No need to await.
            const deleteButton = screen.getByTestId("delete-button-1");
            deleteButton.click();

            const successAlert = screen.getByAltText("Cart item successfully deleted!");
            expect(successAlert).toBeInTheDocument();
        })
    });
});