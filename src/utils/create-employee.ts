"use server";

import { EmployeeFormData } from "@/types/employee";
import { revalidatePath } from "next/cache";

export async function createEmployee(employeeData: EmployeeFormData) {
  const formData = new FormData();
  formData.append("name", employeeData.name);
  formData.append("surname", employeeData.surname);
  if (employeeData.avatar) {
    formData.append("avatar", employeeData.avatar);
  }
  formData.append("department_id", employeeData.department_id.toString());

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/employees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }

  revalidatePath("/employees");
}
