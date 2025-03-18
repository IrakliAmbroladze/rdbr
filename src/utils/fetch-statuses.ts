import { Status } from "@/types/status";

export const fetchStatuses = async (): Promise<Status[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/statuses`);
    if (!response.ok) {
      throw new Error("Failed to fetch statuses");
    }
    const statuses: Status[] = await response.json();
    return statuses;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return null;
  }
};
