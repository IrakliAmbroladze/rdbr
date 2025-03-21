"use client";

import { Department } from "@/types/department";
import { Employee } from "@/types/employee";
import { Priority } from "@/types/priority";
import { Status } from "@/types/status";
import { Task_Form } from "@/types/task";
import { createTask } from "@/utils/create-task";

import React, { useEffect, useState } from "react";

const TaskForm = ({
  priorities,
  statuses,
  departments,
  employees,
}: {
  priorities: Priority[];
  statuses: Status[];
  departments: Department[];
  employees: Employee[];
}) => {
  const initialFormData: Task_Form = {
    name: "",
    description: "",
    due_date: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    priority_id: 2,
    status_id: 1,
    employee_id: 0,
  };
  const [formData, setFormData] = useState<Task_Form>(initialFormData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);

  const [isValidTitle, setisValidTitle] = useState<null | boolean>(null);
  const [isValidDescription, setisValidDescription] = useState<null | boolean>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("department");
      if (savedData) {
        setSelectedDepartment(Number(savedData));
      }
    }
  }, []);
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    localStorage.setItem("department", value);
    const departmentId = Number(value);
    setSelectedDepartment(departmentId);
  };

  const filteredEmployees = employees.filter(
    (employee) => employee.department.id === selectedDepartment
  );

  const validateInput = (value: string) => {
    const regex = /^[a-zA-Z0-9\u10D0-\u10FF\s]*$/;
    return regex.test(value) && value.length >= 2 && value.length <= 255;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const regex = /^[a-zA-Z0-9\u10D0-\u10FF\s]*$/;

    setFormData((prevData) => {
      const newValue = ["priority_id", "status_id", "employee_id"].includes(
        name
      )
        ? Number(value)
        : value;

      if (name === "name" || name === "description") {
        if (!regex.test(value) && value !== "") return prevData;

        if (name === "name") {
          setisValidTitle(
            value.length === 0 ? null : value.length >= 2 && value.length <= 255
          );
        }
        if (name === "description") {
          setisValidDescription(
            value.length === 0 ? null : value.length >= 4 && value.length <= 255
          );
        }
      }

      const updatedData = { ...prevData, [name]: newValue };

      localStorage.setItem("formData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    if (!validateInput(formData.name)) {
      setError("ფორმა შეიცავს არასწორ მონაცემებს!");
      return;
    }
    try {
      localStorage.removeItem("formData");
      localStorage.removeItem("department");
      await createTask(formData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Error: " + error.message);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5">
        <div className="flex w-full justify-around">
          <div className="flex flex-col p-5 w-full">
            <label htmlFor="name">სათაური*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-label="Enter name"
              required
              className={`w-full p-2 border rounded ${
                isValidTitle === null
                  ? "border-gray-400"
                  : isValidTitle
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            <div
              className={`text-sm ${
                isValidTitle === null
                  ? "text-gray-400"
                  : isValidTitle
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <div>min 2 chars</div>
              <div>max 255 chars</div>
            </div>
            <br />
            <label htmlFor="description">აღწერა</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              aria-label="Enter description"
              className={`w-full p-2 border rounded ${
                isValidDescription === null
                  ? "border-gray-400"
                  : isValidDescription
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            <div
              className={`text-sm ${
                isValidDescription === null
                  ? "text-gray-400"
                  : isValidDescription
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <div>min 4 chars</div>
              <div>max 255 chars</div>
            </div>
            <br />
            <div className="flex">
              <div className="w-full pr-5">
                <label htmlFor="priority_id">პრიორიტეტი*</label>
                <select
                  id="priority_id"
                  name="priority_id"
                  value={formData.priority_id}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full pl-5">
                <label htmlFor="status_id">სტატუსი*</label>
                <select
                  id="status_id"
                  name="status_id"
                  value={formData.status_id}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 w-full">
            <label htmlFor="department">დეპარტამენტი*</label>
            <select
              id="department"
              name="department"
              value={selectedDepartment ? selectedDepartment : 0}
              onChange={handleDepartmentChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
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
              disabled={!selectedDepartment}
              style={{
                backgroundColor: selectedDepartment ? "white" : "#e0e0e0",
              }}
            >
              <option value=""></option>
              {filteredEmployees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} {employee.surname}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="delivery-date">დედლაინი</label>
            <input
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <br />
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex justify-end p-10">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
