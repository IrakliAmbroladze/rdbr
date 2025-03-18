import { Task } from "@/types/task";

export const fetchTasks = async (): Promise<Task[] | null> => {
  try {
    const response = await fetch(`${process.env.SERVER}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.Token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch statuses");
    }
    const tasks: Task[] = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};
