"use server";

import { Employee } from "@/types/employee";

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const employees: Employee[] = await response.json();
    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};
