import Filters from "@/components/filters";
import TasksList from "@/components/tasks-list";
import { fetchTasks } from "@/utils/fetch-tasks";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const tasks = await fetchTasks();

  return (
    <>
      <div>დავალებების გვერდი</div>
      <Filters />
      {tasks && <TasksList tasks={tasks} />}
    </>
  );
}
