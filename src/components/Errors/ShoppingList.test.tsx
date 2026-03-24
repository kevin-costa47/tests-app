import userEvent from "@testing-library/user-event";
import { ShoppingList } from "./ShoppingList";
import { render, screen, within } from "@testing-library/react";
import * as Utils from "./utils";

describe("ShoppingList Error Tests", () => {
  it("Shpping List 1 Errors ", () => {
    const groceries = ["Apple", "Orange", "Banana", "Pineapple", "Banana"];
    const clickItem = () => {};

    expect(() =>
      render(<ShoppingList groceries={groceries} selectItem={clickItem} />),
    ).toThrow("Groceries cannot have duplicates");
  });

  it("Shpping List 1 Errors Generic Message ", () => {
    const groceries = ["Apple", "Orange", "Banana", "Pineapple", "Banana"];
    const clickItem = () => {};

    expect(() =>
      render(<ShoppingList groceries={groceries} selectItem={clickItem} />),
    ).toThrow(/duplicate/);
  });
});

describe("ShoppingList Tests suits", () => {
  it("should select ingredientes - local spy ", async () => {
    const someFunction = (item: string) => {
      console.log(item);
    };

    const someFunctionWrapper = {
      function: someFunction,
    };

    const user = userEvent.setup();

    const groceries = ["Apple", "Orange", "Pineapple"];
    const someFunctionSpy = vi.spyOn(someFunctionWrapper, "function");

    render(
      <ShoppingList
        groceries={groceries}
        selectItem={someFunctionWrapper.function}
      />,
    );

    const shoopingList = screen.getByRole("list");
    expect(shoopingList).toBeInTheDocument();
    const ingredientsItems = within(shoopingList).getAllByRole("listitem");
    expect(ingredientsItems).toHaveLength(3);

    const milkIngredient = ingredientsItems[0];
    await user.click(milkIngredient);

    expect(someFunctionSpy).toHaveBeenCalledTimes(1);
    expect(someFunctionSpy).toHaveBeenCalledWith("Apple");
  });

  it("should select ingredientes - exteral spy ", async () => {
    const user = userEvent.setup();

    const groceries = ["Apple", "Orange", "Pineapple"];
    const someFunctionSpy = vi.spyOn(Utils, "onItemSelected");

    render(
      <ShoppingList groceries={groceries} selectItem={Utils.onItemSelected} />,
    );

    const shoopingList = screen.getByRole("list");
    expect(shoopingList).toBeInTheDocument();
    const ingredientsItems = within(shoopingList).getAllByRole("listitem");
    expect(ingredientsItems).toHaveLength(3);

    const milkIngredient = ingredientsItems[0];
    await user.click(milkIngredient);

    expect(someFunctionSpy).toHaveBeenCalledTimes(1);
    expect(someFunctionSpy).toHaveBeenCalledWith("Apple");
  });

  it("should select ingredientes - exteral spy with time ", async () => {
    const user = userEvent.setup();

    const groceries = ["Apple", "Orange", "Pineapple"];
    const someFunctionSpy = vi.spyOn(Date, "now");

    render(
      <ShoppingList
        groceries={groceries}
        selectItem={Utils.onItemSelectedWithTime}
      />,
    );

    const shoopingList = screen.getByRole("list");
    expect(shoopingList).toBeInTheDocument();
    const ingredientsItems = within(shoopingList).getAllByRole("listitem");
    expect(ingredientsItems).toHaveLength(3);

    const milkIngredient = ingredientsItems[0];
    await user.click(milkIngredient);

    expect(someFunctionSpy).toHaveBeenCalled();
  });

  it("should select ingredientes - exteral spy with time ", async () => {
    const selectedItemMock = vi.fn();

    const groceries = ["Apple", "Orange", "Pineapple"];

    render(
      <ShoppingList groceries={groceries} selectItem={selectedItemMock} />,
    );

    const user = userEvent.setup();

    const shoopingList = screen.getByRole("list");
    expect(shoopingList).toBeInTheDocument();
    const ingredientsItems = within(shoopingList).getAllByRole("listitem");
    expect(ingredientsItems).toHaveLength(3);

    const milkIngredient = ingredientsItems[0];
    await user.click(milkIngredient);

    expect(selectedItemMock).toHaveBeenCalled();
  });
});
