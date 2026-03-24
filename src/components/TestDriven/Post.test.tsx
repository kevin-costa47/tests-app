import { act, render, screen, within } from "@testing-library/react";
import { Post } from "./Post";
import * as DataService from "./DataService";
import type { Comment } from "./Model";
import axios from "axios";
import userEvent from "@testing-library/user-event";

describe("Post Tests", () => {
  const someUserName = "Alex";
  const someContent = "The Sky is Blue";

  const someId = "123";
  const someComments: Comment[] = [
    {
      content: "Cool1",
      date: new Date().getTime(),
    },
    {
      content: "Cool2",
      date: new Date().getTime() + 2000,
    },
  ];

  it("get comments for post spy", async () => {
    const getCommentsForPostSpy = vi.spyOn(axios, "get");
    getCommentsForPostSpy.mockResolvedValueOnce({ data: someComments });

    await act(async () => {
      render(<Post content={someContent} user={someUserName} id={someId} />);
    });

    const commentsContainer = screen.getByTestId("post-comment-container");
    const comments = within(commentsContainer).getAllByRole("paragraph");

    expect(comments.length).toBe(2);
    expect(comments[0]).toHaveTextContent("Cool2");
    expect(comments[1]).toHaveTextContent("Cool1");
  });

  it("should get comments for post", async () => {
    const getCommentsForPostSpy = vi.spyOn(axios, "get");
    getCommentsForPostSpy.mockResolvedValueOnce({ data: someComments });

    await act(async () => {
      render(<Post content={someContent} user={someUserName} id={someId} />);
    });

    expect(getCommentsForPostSpy).toHaveBeenCalledTimes(1);

    const getCommentsForPostSpyUrl = getCommentsForPostSpy.mock.calls[0][0];
    expect(getCommentsForPostSpyUrl.endsWith("comments")).toBe(true);

    const getCommentsForPostCallId =
      getCommentsForPostSpy.mock.calls[0][1]?.params.id;
    expect(getCommentsForPostCallId).toBe(someId);
  });

  it("should NOT get comments for post", async () => {
    const getCommentsForPostSpy = vi.spyOn(axios, "get");
    getCommentsForPostSpy.mockRejectedValueOnce(new Error("Backend down"));

    await act(async () => {
      render(<Post content={someContent} user={someUserName} id={someId} />);
    });

    const erroLabel = screen.getByTestId("error-label");
    expect(erroLabel).toBeInTheDocument();
    expect(erroLabel).not.toBeEmptyDOMElement();
    expect(erroLabel).toHaveTextContent("Error while getting comments!");
  });

  it("should NOT get comments for post", async () => {
    const getCommentsForPostSpy = vi.spyOn(DataService, "psotCommentWithAxios");

    const date = new Date().getTime();
    vi.setSystemTime(date);

    await act(async () => {
      render(<Post content={someContent} user={someUserName} id={someId} />);
    });

    const user = userEvent.setup();
    const commentInput = screen.getByTestId("comment-input");
    const commentContent = "Comment Here";
    await user.type(commentInput, commentContent);

    const commentButton = screen.getByRole("button");
    await user.click(commentButton);

    expect(getCommentsForPostSpy).toHaveBeenCalledTimes(1);
    expect(getCommentsForPostSpy).toHaveBeenCalledWith(
      someId,
      commentContent,
      date,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
