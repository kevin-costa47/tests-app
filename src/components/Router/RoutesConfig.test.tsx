import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routesConfig } from "./RoutesConfig";
import userEvent from "@testing-library/user-event";
import { AppWithRoutes } from "./AppWithRoutes";

vi.mock("./Routes/Home", () => ({
  Home: () => <div data-testid="HomeMock" />,
}));

vi.mock("./Routes/About", () => ({
  About: () => <div data-testid="AboutMock" />,
}));

describe("RoutesConfig", () => {
  it("home route", () => {
    const route = "/";
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [route],
    });

    render(<RouterProvider router={router} />);

    const home = screen.getByTestId("HomeMock");

    expect(home).toBeInTheDocument();
  });
});

describe("RoutesConfig", () => {
  it("about route", () => {
    const route = "/about";
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [route],
    });

    render(<RouterProvider router={router} />);

    const about = screen.getByTestId("AboutMock");

    expect(about).toBeInTheDocument();
  });
});

describe("Navbar navigation Tests", () => {
  it("show home on nav click", async () => {
    render(<AppWithRoutes />);

    const user = userEvent.setup();
    const homeButton = screen.getByText("Home");

    await user.click(homeButton);
    expect(screen.getByTestId("HomeMock")).toBeInTheDocument();
  });
});
