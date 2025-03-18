import { Task } from "@/types/task";
import React, { JSX } from "react";
import { fetchTask } from "@/utils/fetch-single-task";

const SingleTask = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<JSX.Element> => {
  const { id } = await params;
  if (isNaN(id)) {
    return <p>Invalid task ID</p>;
  }
  try {
    const task: Task | null = await fetchTask(id);
    if (!task) {
      return <p>Task does not exist</p>;
    }

    return (
      <div>
        {task.name}
        {task.description}
      </div>
    );
  } catch (error) {
    console.error("Error fetching task:", error);
    return <p>There was an issue fetching the task. Please try again later.</p>;
  }
};

export default SingleTask;
