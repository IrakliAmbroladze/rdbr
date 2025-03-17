import Filters from "@/components/filters";
import TasksList from "@/components/tasks-list";
import { Task } from "@/types/task";
import { JSX } from "react";

export default function Home(): JSX.Element {
  const tasks: Task[] = [
    {
      id: 1,
      name: "შესარჩევი დავალება",
      description: "შექმენით ვებ გვერდი დიზაინის მიხედვით",
      due_date: "2025-12-31",
      status: {
        id: 1,
        name: "Todo",
      },
      priority: {
        id: 1,
        name: "High",
        icon: "…",
      },
      department: {
        id: 1,
        name: "IT",
      },
      employee: {
        id: 1,
        name: "ლადო",
        surname: "გაგა",
        avatar: "…",
        department_id: 1,
      },
    },
  ];

  return (
    <>
      <div>დავალებების გვერდი</div>
      <Filters />
      <TasksList tasks={tasks} />
    </>
  );
}
