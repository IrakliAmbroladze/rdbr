"use server";

import { Task } from "@/types/task";

export const fetchTask = async (id: number): Promise<Task | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/tasks/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }

    const task: Task = await response.json();
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
};
