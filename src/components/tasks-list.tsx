import { Task } from "@/types/task";
import React, { JSX } from "react";
import { fetchStatuses } from "@/utils/fetch-statuses";
import Link from "next/link";
import Image from "next/image";
import DateComponent from "@/components/date";

const TasksList = async ({
  tasks,
  priorities = [],
  departments = [],
  employees = [],
}: {
  tasks: Task[];
  priorities: number[];
  departments: number[];
  employees: number[];
}): Promise<JSX.Element> => {
  const statuses = await fetchStatuses();
  const matchesFilter = (task: Task) =>
    (priorities.length === 0 || priorities.includes(task.priority.id)) &&
    (departments.length === 0 || departments.includes(task.department.id)) &&
    (employees.length === 0 || employees.includes(task.employee.id));

  if (statuses != null) {
    const groupedTasks = statuses.map((status) => ({
      status,
      tasks: tasks.filter(
        (task) => task.status.id === status.id && matchesFilter(task)
      ),
    }));
    return (
      <div className="grid grid-cols-4 gap-4 ">
        {groupedTasks.map(({ status, tasks }, index) => (
          <div key={index} className="p-4">
            <h2
              className={`text-white 
                ${status.id == 1 && "bg-[#F7BC30]"} 
                ${status.id == 2 && "bg-[#FB5607]"}
                ${status.id == 3 && "bg-[#FF006E]"}
                ${status.id == 4 && "bg-[#3A86FF]"}
                rounded-lg
                justify-center
                text-center
                p-2.5
                `}
            >
              {status.name}
            </h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <Link
                    href={`/${task.id}`}
                    className="block p-2 hover:bg-gray-200 border rounded-2xl my-5 border-[#FB5607] "
                  >
                    <div className="flex justify-between">
                      <button className="flex border rounded-lg p-1.5">
                        <Image
                          src={task.priority.icon}
                          alt="Priority Icon"
                          width={24}
                          height={24}
                        />

                        {task.priority.name}
                      </button>
                      <div className="bg-[#FF66A8] text-white rounded-2xl text-center p-1.5">
                        {task.department.name.slice(0, 10)}{" "}
                        {task.department.name.length > 10 ? "..." : ""}
                      </div>
                      <DateComponent date={task.due_date} />
                    </div>
                    <div className="font-bold my-5">{task.name}</div>
                    {task.description && (
                      <div className="overflow-hidden">
                        {task.description.slice(0, 100)}
                        {task.description.length > 100 ? "..." : ""}
                      </div>
                    )}

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
