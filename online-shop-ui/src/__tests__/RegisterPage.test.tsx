import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../app/components/pages/auth/RegisterPage";
import * as AuthRequest from "../app/api/AuthRequest";
import { clickSubmitButton } from "../app/utils/TestUtils";

describe("Register Page Tests", () => {
    it("Test register success", async () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const loginMock = jest.spyOn(AuthRequest, 'register');
        loginMock.mockReturnValue(Promise.resolve({ status: 200 }));

        const title = screen.getByTestId("title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Sign Up");

        const roleSelection = screen.getByDisplayValue("USER");
        expect(roleSelection).toBeInTheDocument();

        const emailInput = screen.getByText("Email");
        expect(emailInput).toBeInTheDocument();

        const usernameInput = screen.getByText("Username");
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByText("Password");
        expect(passwordInput).toBeInTheDocument();

        const copyright = screen.getByText("Online Shop");
        expect(copyright).toBeInTheDocument();

        const loginHref = screen.getByText("Have already an account? Log in");
        expect(loginHref).toBeInTheDocument();

        clickSubmitButton();

        await waitFor(() => {
            const alertSuccess = screen.getByTestId("alert-success");
            expect(alertSuccess).toBeInTheDocument();
            expect(alertSuccess).toHaveTextContent("User registered successfully!");
        });
    });

    it("Test register fail", async () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const loginMock = jest.spyOn(AuthRequest, 'register');
        loginMock.mockReturnValue(Promise.resolve({ status: 404, error: "Error" }));

        clickSubmitButton();

        await waitFor(() => { 
            const alertError = screen.getByTestId("alert-error");
            expect(alertError).toBeInTheDocument();
            expect(alertError).toHaveTextContent("Error");
        });
    });
});