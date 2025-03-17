import Filters from "@/components/filters";
import TasksList from "@/components/tasks-list";

export default function Home() {
  return (
    <>
      <div>დავალებების გვერდი</div>
      <Filters />
      <TasksList />
    </>
  );
}
