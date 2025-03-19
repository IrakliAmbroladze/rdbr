import { Department } from "@/types/department";
import { Status } from "@/types/status";
import { Priority } from "@/types/priority";
import { Employee } from "@/types/employee";
export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments: number;
}
export interface Task_Form {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}
