import { Task } from "@/types/task";
import React, { JSX } from "react";
import { fetchStatuses } from "@/utils/fetch-statuses";
import Link from "next/link";
import Image from "next/image";
import DateComponent from "@/components/date";

const TasksList = async ({
  tasks,
  priorities = [],
}: {
  tasks: Task[];
  priorities: number[];
}): Promise<JSX.Element> => {
  const statuses = await fetchStatuses();
  if (statuses != null) {
    const groupedTasks = statuses.map((status) => ({
      status,
      tasks: tasks.filter(
        (task) =>
          task.status.id === status.id &&
          (priorities.length === 0 || priorities.includes(task.priority.id))
      ),
    }));
    return (
      <div className="grid grid-cols-4 gap-4">
        {groupedTasks.map(({ status, tasks }, index) => (
          <div key={index} className="border p-4">
            <h2 className="font-bold">{status.name}</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <Link
                    href={`/${task.id}`}
                    className="block p-2 hover:bg-gray-200 rounded-md"
                  >
                    <div className="flex">
                      <button className="flex border">
                        <Image
                          src={task.priority.icon}
                          alt="Priority Icon"
                          width={24}
                          height={24}
                        />

                        {task.priority.name}
                      </button>
                      <div>{task.department.name}</div>
                      <DateComponent date={task.due_date} />
                    </div>
                    <div>{task.name}</div>
                    <div>
                      {task.description.slice(0, 100)}
                      {task.description.length > 100 ? "..." : ""}
                    </div>
                    <div className="flex justify-between">
                      <Image
                        src={task.employee.avatar}
                        alt="Employee avatar"
                        width={31}
                        height={31}
                      />
                      <div className="flex justify-center items-center gap-1">
                        <Image
                          src="/icons/chat.svg"
                          alt="Chat Icon"
                          width={20}
                          height={19}
                        />
                        <div>{task.total_comments}</div>
                      </div>
                    </div>
                  </Link>
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
