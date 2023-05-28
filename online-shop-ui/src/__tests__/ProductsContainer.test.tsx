import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsContainer from "../app/components/pages/products/ProductsContainer";
import * as ProductRequest from "../app/api/ProductRequest";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from "redux";

describe("Products Container Tests", () => {
    const initialState = { jwt: { token: "jwtkey" } }
    const mockStore = configureStore()
    let store: Store;

    it("Test Products displayed", () => {
        store = mockStore(initialState)

        const getAllProductsMock = jest.spyOn(ProductRequest, 'getProducts');
        const result = [{ "name": "Apple", "price": 2.5, "categories": [], "userId": 2 }];
        getAllProductsMock.mockReturnValue(Promise.resolve(JSON.stringify(result)));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProductsContainer />
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

            const addToCartButton = screen.getByText("Add To Cart");
            expect(addToCartButton).toBeInTheDocument();
        })
    });
});