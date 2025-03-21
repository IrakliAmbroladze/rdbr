"use server";

import { Task } from "@/types/task";

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks: Task[] = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
