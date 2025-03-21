import TaskForm from "@/components/task-form";
import { Department } from "@/types/department";
import { Employee } from "@/types/employee";
import { Priority } from "@/types/priority";
import { Status } from "@/types/status";
import { fetchDepartments } from "@/utils/fetch-departments";
import { fetchEmployees } from "@/utils/fetch-employees";
import { fetchPriorities } from "@/utils/fetch-priorities";
import { fetchStatuses } from "@/utils/fetch-statuses";
import React from "react";

const CreateTask = async () => {
  const priorities: Priority[] = await fetchPriorities();
  const statuses: Status[] = await fetchStatuses();
  const departments: Department[] = await fetchDepartments();
  const employees: Employee[] = await fetchEmployees();
  return (
    <>
      <div>შექმენი ახალი დავალება</div>
      <TaskForm
        priorities={priorities}
        statuses={statuses}
        departments={departments}
        employees={employees}
      />
    </>
  );
};

export default CreateTask;
