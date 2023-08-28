import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../app/components/pages/auth/LoginPage";
import * as AuthRequest from "../app/api/AuthRequest";
import { clickSubmitButton } from "../app/utils/TestUtils";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from "redux";

describe("Login Page Tests", () => {
    const initialState = { token: "" }
    const mockStore = configureStore()
    let store: Store;

    it("Test login success", () => {
        store = mockStore(initialState)

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const loginMock = jest.spyOn(AuthRequest, 'login');
        loginMock.mockReturnValue(Promise.resolve({ status: 200 }));

        const title = screen.getByTestId("title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Sign In");

        const usernameInput = screen.getByText("Username");
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByText("Password");
        expect(passwordInput).toBeInTheDocument();

        const copyright = screen.getByText("Online Shop");
        expect(copyright).toBeInTheDocument();

        const registerHref = screen.getByText("Don't have an account? Sign Up");
        expect(registerHref).toBeInTheDocument();
    });

    it("Test login fail", async () => {
        store = mockStore(initialState)

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const loginMock = jest.spyOn(AuthRequest, 'login');
        loginMock.mockReturnValue(Promise.resolve({
            "fieldErrors": [
                {
                    "field": "password",
                    "message": "Password is required."
                },
                {
                    "field": "username",
                    "message": "Username is required."
                },
            ]
        }));

        clickSubmitButton();

        await waitFor(async () => {
            let fieldErrorMessage = document.getElementById("username-helper-text")
            expect(fieldErrorMessage).toBeInTheDocument();

            fieldErrorMessage = document.getElementById("password-helper-text");
            expect(fieldErrorMessage).toBeInTheDocument();
        });
    });
});