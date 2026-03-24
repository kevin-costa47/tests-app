import type { Comment } from "../Network/Model";
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
