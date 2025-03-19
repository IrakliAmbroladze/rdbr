"use server";

import { Comment } from "@/types/comment";

export const fetchComments = async (id: number): Promise<Comment[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tasks/${id}/comments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const comments: Comment[] = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
};
