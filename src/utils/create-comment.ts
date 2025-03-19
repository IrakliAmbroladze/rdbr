"use server";

import { CommentFormData } from "@/types/comment";

export async function createComment(commentData: CommentFormData, id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tasks/${id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify(commentData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
}
