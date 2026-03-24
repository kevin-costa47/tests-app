import {First } from "./First";
import { render ,screen} from "@testing-library/react";

describe("First Tests", () => {
    test("should render", () => {
        const { getByText } = render(<First />);
        expect(getByText("First")).toBeInTheDocument();

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });
});