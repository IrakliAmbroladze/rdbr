import { Department } from "@/types/department";

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/departments`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const departments: Department[] = await response.json();
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};
