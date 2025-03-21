import Comments from "@/components/comments";
import { Task } from "@/types/task";
import React, { JSX } from "react";
import { fetchTask } from "@/utils/fetch-single-task";
import Image from "next/image";
import DateComponent from "@/components/date";

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
      <div className="px-[120px]">
        <div className="flex mt-36">
          <div className=" flex-1">
            <div className="block p-2">
              <div className="flex gap-5">
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
              </div>
              <div className="font-bold my-5">{task.name}</div>
              {task.description && (
                <div className="overflow-hidden">
                  {task.description.slice(0, 100)}
                  {task.description.length > 100 ? "..." : ""}
                </div>
              )}

              <div className="flex justify-between">
                <div className="flex justify-center items-center gap-1">
                  <div>{task.total_comments}</div>
                </div>
              </div>

              <div className="font-bold my-5">დავალების დეტალები</div>
              <div className="flex gap-10 my-5">
                <span>სტატუსი</span> <span>{task.status.name}</span>
              </div>
              <div className="flex gap-10 my-5">
                <span>თანამშრომელი</span>{" "}
                <div className="flex gap-1.5">
                  <Image
                    src={task.employee.avatar}
                    alt="Employee avatar"
                    width={31}
                    height={31}
                  />
                  <span>
                    {task.employee.name} {task.employee.surname}
                  </span>
                </div>
              </div>
              <div className="flex gap-10 my-5">
                <span>დავალების ვადა</span>{" "}
                <DateComponent date={task.due_date} />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#F8F3FEA6] px-10">
            <Comments id={id} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching task:", error);
    return <p>There was an issue fetching the task. Please try again later.</p>;
  }
};

export default SingleTask;
