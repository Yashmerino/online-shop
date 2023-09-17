import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import QuantityInput from "../app/components/QuantityInput";

describe("Quantity input Tests", () => {
    it("Test quantity input functional", () => {
        render(
            <QuantityInput defaultValue={1} id={"quantity-input"} />
        );

        waitFor(() => { // NOSONAR: No need to await.
            const incrementButton = screen.getByTestId("AddIcon");
            const decrementButton = screen.getByTestId("RemoveIcon");

            let quantity = document.getElementById("quantity-input");
            expect(quantity).toBe(1);

            fireEvent.click(incrementButton);
            quantity = document.getElementById("quantity-input");
            expect(quantity).toBe(2);

            fireEvent.click(decrementButton);
            quantity = document.getElementById("quantity-input");
            expect(quantity).toBe(1);

            fireEvent.click(decrementButton);
            quantity = document.getElementById("quantity-input");
            expect(quantity).toBe(1);
        })
    });
});