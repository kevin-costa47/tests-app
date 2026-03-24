import SimplePost from "./SimplePost";
import { render, screen, within } from "@testing-library/react";

describe("SimplePost Tests", () => {
  test("should render in the document - no likes ", () => {
    const someUserName = "Alex";
    const someContent = "The Sky is Blue";

    render(<SimplePost content={someContent} user={someUserName} />);

    const postContainer = screen.getByTestId("post-container");
    expect(postContainer).toBeInTheDocument();
    expect(postContainer).toHaveTextContent("The Sky is Blue");

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(someUserName);

    const paragraf = screen.getByRole("paragraph");
    expect(paragraf).toBeInTheDocument();
    expect(paragraf).toHaveTextContent(someContent);

    const likes = screen.queryByRole("listitem");
    expect(likes).not.toBeInTheDocument();
  });

  test("should render in the document - has likes ", () => {
    const someUserName = "Alex";
    const someContent = "The Sky is Blue";
    const someLikes = ["John", "Mary"];

    render(
      <SimplePost
        content={someContent}
        user={someUserName}
        likesBy={someLikes}
      />,
    );

    const likesContainer = screen.getByTestId("likes-container");
    const likes = within(likesContainer).getAllByRole("listitem");
    expect(likes.length).toBe(2);
    expect(likes[0]).toBeInTheDocument();
    expect(likes[0]).toHaveTextContent(someLikes[0]);
    expect(likes[1]).toBeInTheDocument();
    expect(likes[1]).toHaveTextContent(someLikes[1]);
  });
});

describe("Simple Post Snapshot Tests", () => {
  test("should render in the document - no likes ", () => {
    const someUserName = "Alex";
    const someContent = "The Sky is Blue";

    const { asFragment } = render(
      <SimplePost content={someContent} user={someUserName} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
