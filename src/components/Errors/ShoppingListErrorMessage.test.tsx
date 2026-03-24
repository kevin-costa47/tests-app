import { ShoppingListErrorMessage } from "./ShoppingListErrorMessage";
import { render, screen } from "@testing-library/react";

describe("ShoppingListErrorMessage Tests with Errors", () => {
  it("Shpping List 1 Errors ", () => {
    const groceries = ["Apple", "Orange", "Banana", "Pineapple", "Banana"];

    render(
      <ShoppingListErrorMessage groceries={groceries} selectItem={() => {}} />,
    );
    const errorMessage = screen.getByRole("paragraph");
    expect(errorMessage).toHaveTextContent(/duplicate/);
  });
});
