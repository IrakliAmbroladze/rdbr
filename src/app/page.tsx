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

  const parseToNumberArray = (value: string | string[] | undefined): number[] =>
    (Array.isArray(value) ? value : value?.split(","))?.map(Number) || [];

  const prioritiesArray = parseToNumberArray(priorities);
  const departmentsArray = parseToNumberArray(departments);
  const employeesArray = parseToNumberArray(employees);

  const tasks = await fetchTasks();
  return (
    <div className="px-[120px]">
      <div className="text-4xl font-bold mt-36">დავალებების გვერდი</div>
      <Filters />
      {tasks && (
        <TasksList
          tasks={tasks}
          priorities={prioritiesArray}
          departments={departmentsArray}
          employees={employeesArray}
        />
      )}
    </div>
  );
}
