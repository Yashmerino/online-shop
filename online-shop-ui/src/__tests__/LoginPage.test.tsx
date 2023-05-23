import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../app/components/pages/LoginPage";
import * as AuthRequest from "../app/api/AuthRequest";
import { clickSubmitButton } from "../app/utils/TestUtils";


describe("Login Page Tests", () => {
    it("Test login success", () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
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

        clickSubmitButton();
    });

    it("Test login fail", async () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        const loginMock = jest.spyOn(AuthRequest, 'login');
        loginMock.mockReturnValue(Promise.resolve({ status: 404, error: "Error" }));

        clickSubmitButton();

        await waitFor(() => {
            const alertError = screen.getByTestId("alert-error");
            expect(alertError).toBeInTheDocument();
            expect(alertError).toHaveTextContent("Error");
        });
    });
});