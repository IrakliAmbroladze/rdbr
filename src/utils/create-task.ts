"use server";

import { Task_Form } from "@/types/task";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(taskData: Task_Form) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  revalidatePath("/tasks");
  redirect("/");
}
