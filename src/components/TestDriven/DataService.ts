import type { Comment } from "./Model";
import axios from "axios";

const APP_URL = "https://localhost:3000";
export async function getCommentsForPostWithAxios(
  id: string,
): Promise<Comment[]> {
  const response = await axios.get(`${APP_URL}/posts/${id}/comments`, {
    params: { id },
  });
  return response.data;
}

export async function psotCommentWithAxios(
  id: string,
  Comment: string,
  date: number,
) {
  console.log(`posted comment for post ${id} at ${date}: ${Comment}`);
}
