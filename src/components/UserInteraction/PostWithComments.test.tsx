import PostWithComments from "./PostWithComments";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("PostWithComments Tests", () => {
  describe("User Interaction", () => {
    const content = "Comment Here";
    const user = "User";

    beforeEach(() => {
      render(<PostWithComments content={content} user={user} />);
    });

    test("user can comment ", async () => {
      const user = userEvent.setup();

      const commentInput = screen.getByTestId("comment-input");
      const commentContent = "Comment Here";

      await user.type(commentInput, commentContent);
      expect(commentInput).toHaveValue(commentContent);
    });

    test("user can clean input box", async () => {
      const user = userEvent.setup();

      const commentInput = screen.getByTestId("comment-input");
      const commentButton = screen.getByRole("button");
      const commentContent = "Comment Here";

      await user.type(commentInput, commentContent);
      expect(commentInput).toHaveValue(commentContent);

      await user.click(commentButton);
      expect(commentInput).toBeEmptyDOMElement();
    });

    test("user can input and show one comment", async () => {
      const user = userEvent.setup();

      const commentInput = screen.getByTestId("comment-input");
      const commentButton = screen.getByRole("button");
      const commentContent = "You are awesome!";

      await user.type(commentInput, commentContent);
      expect(commentInput).toHaveValue(commentContent);

      await user.click(commentButton);

      const commentsContainer = screen.getByTestId("comments-container");
      const comments = within(commentsContainer).getAllByRole("paragraph");

      expect(comments).toHaveLength(1);
      expect(comments[0]).toHaveTextContent(commentContent);
    });

    test("user can input and show many comments", async () => {
      const user = userEvent.setup();

      const commentInput = screen.getByTestId("comment-input");
      const commentButton = screen.getByRole("button");
      const commentContent_1 = "You are awesome!";
      const commentContent_2 = "Nice Card!";

      await user.type(commentInput, commentContent_1);
      expect(commentInput).toHaveValue(commentContent_1);

      await user.click(commentButton);

      await user.type(commentInput, commentContent_2);
      expect(commentInput).toHaveValue(commentContent_2);

      await user.click(commentButton);

      const commentsContainer = screen.getByTestId("comments-container");
      const comments = within(commentsContainer).getAllByRole("paragraph");

      expect(comments).toHaveLength(2);
      expect(comments[0]).toHaveTextContent(commentContent_1);
      expect(comments[1]).toHaveTextContent(commentContent_2);
    });
  });
});
