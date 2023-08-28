import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as ProductRequest from "../app/api/ProductRequest";
import MyProductsPage from "../app/components/pages/products/MyProductsPage";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from "redux";

describe("Products Container Tests", () => {
    const initialState = { jwt: { token: "jwtkey" }, username: { sub: "seller" }, roles: { roles: { roles: [{ id: 1, name: "SELLER" }] } } };
    const mockStore = configureStore()
    let store: Store;

    it("Test Seller Products displayed", () => {
        store = mockStore(initialState)

        const getSellerProducts = jest.spyOn(ProductRequest, 'getSellerProducts');
        const result = [{ "name": "Apple", "price": 2.5, "categories": [], "userId": 2 }];
        getSellerProducts.mockReturnValue(Promise.resolve(JSON.stringify(result)));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MyProductsPage />
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