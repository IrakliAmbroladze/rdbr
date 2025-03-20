import Filters from "@/components/filters";
import TasksList from "@/components/tasks-list";
import { fetchTasks } from "@/utils/fetch-tasks";
import { JSX } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<JSX.Element> {
  const { priorities } = await searchParams;
  const { departments } = await searchParams;
  const { employees } = await searchParams;

  const prioritiesArray: number[] =
    (Array.isArray(priorities) ? priorities : priorities?.split(","))?.map(
      Number
    ) || [];
  const departmentsArray: number[] =
    (Array.isArray(departments) ? departments : departments?.split(","))?.map(
      Number
    ) || [];
  const employeesArray: number[] =
    (Array.isArray(employees) ? employees : employees?.split(","))?.map(
      Number
    ) || [];

  const tasks = await fetchTasks();
  return (
    <>
      <div>დავალებების გვერდი</div>
      <Filters />
      {tasks && (
        <TasksList
          tasks={tasks}
          priorities={prioritiesArray}
          departments={departmentsArray}
          employees={employeesArray}
        />
      )}
    </>
  );
}
