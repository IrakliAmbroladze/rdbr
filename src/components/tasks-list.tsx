import { Task } from "@/types/task";
import React, { JSX } from "react";
import { fetchStatuses } from "@/utils/fetch-statuses";

const TasksList = async ({
  tasks,
}: {
  tasks: Task[];
}): Promise<JSX.Element> => {
  const statuses = await fetchStatuses();
  if (statuses != null) {
    const groupedTasks = statuses.map((status) => ({
      status,
      tasks: tasks.filter((task) => task.status.id === status.id),
    }));
    return (
      <div className="grid grid-cols-4 gap-4">
        {groupedTasks.map(({ status, tasks }, index) => (
          <div key={index} className="border p-4">
            <h2 className="font-bold">{status.name}</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="p-2">
                  <div>{task.name}</div>
                  {task.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No status available</p>;
  }
};

export default TasksList;
