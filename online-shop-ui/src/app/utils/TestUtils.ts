import { screen, fireEvent } from "@testing-library/react";

export function clickSubmitButton() {
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
}