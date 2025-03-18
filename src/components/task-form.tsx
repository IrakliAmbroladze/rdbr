"use client";

import { Task_Form } from "@/types/task";
import React, { useState } from "react";

const TaskForm = () => {
  const initialFormData: Task_Form = {
    name: "",
    description: "",
    due_date: "",
    priority_id: 2,
    status_id: 1,
    employee_id: 0,
  };
  const [formData, setFormData] = useState<Task_Form>(initialFormData);
  // const token = process.env.NEXT_TOKEN;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: ["priority_id", "status_id", "employee_id"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();

    const response = await fetch("/api/tasks/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Task created successfully!");
      setFormData(initialFormData);
    } else {
      alert("Error: " + result.error);
    }

    console.log("Form Data:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5">
        <label htmlFor="name">სათაური*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md"
          aria-label="Enter name"
          required
        />
        <br />
        <label htmlFor="description">აღწერა</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md"
          aria-label="Enter description"
        />
        <br />
        <label htmlFor="priority_id">პრიორიტეტი*</label>
        <select
          id="priority_id"
          name="priority_id"
          value={formData.priority_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="1">დაბალი</option>
          <option value="2">საშუალო</option>
          <option value="3">მაღალი</option>
        </select>
        <br />
        <label htmlFor="status_id">სტატუსი*</label>
        <select
          id="status_id"
          name="status_id"
          value={formData.status_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="1">დასაწყები</option>
          <option value="2">პროგრესში</option>
          <option value="3">მზად ტესტირებისთვის</option>
          <option value="4">დასრულებული</option>
        </select>
        <br />
        <label htmlFor="department">დეპარტამენტი*</label>
        <select
          id="department"
          name="department"
          defaultValue="დიზაინის დეპარტამენტი"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="ადმინისტრაციის დეპარტამენტი">
            ადმინისტრაციის დეპარტამენტი
          </option>
          <option value="დიზაინის დეპარტამენტი">დიზაინის დეპარტამენტი</option>
        </select>
        <br />
        <label htmlFor="employee_id">პასუხისმგებელი თანამშრომელი*</label>
        <select
          id="employee_id"
          name="employee_id"
          onChange={handleChange}
          value={formData.employee_id}
          required
          className="w-full p-2 border rounded"
        >
          <option value={0}></option>
          <option value={1170}>ირაკლი ამბროლაძე</option>
        </select>
        <br />
        <label htmlFor="delivery-date">დედლაინი</label>
        <input
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <br />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          დავალების შექმნა
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
