import { Status } from "@/types/status";

export const fetchStatuses = async (): Promise<Status[] | null> => {
  const url = "https://momentum.redberryinternship.ge/api/statuses";
  try {
    const response = await fetch(url);
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
