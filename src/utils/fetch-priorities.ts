import { Priority } from "@/types/priority";

export const fetchPriorities = async (): Promise<Priority[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/priorities`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch priorities");
    }
    const priorities: Priority[] = await response.json();
    return priorities;
  } catch (error) {
    console.error("Error fetching priorities:", error);
    return [];
  }
};
