"use client";

import React, { useState } from "react";

const TaskForm = () => {
  const initialFormData = {
    title: "",
    description: "",
    priority: "საშუალო",
    status: "დასაწყები",
    department: "დიზაინის დეპარტამენტი",
    employee: "",
    delivery_date: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();

    setFormData(initialFormData);
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5">
        <label htmlFor="title">სათაური*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md"
          aria-label="Enter title"
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
        <label htmlFor="priority">პრიორიტეტი*</label>
        <select
          id="priority"
          name="priority"
          defaultValue="საშუალო"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="დაბალი">დაბალი</option>
          <option value="საშუალო">საშუალო</option>
          <option value="მაღალი">მაღალი</option>
        </select>
        <br />
        <label htmlFor="status">სტატუსი*</label>
        <select
          id="status"
          name="status"
          defaultValue="დასაწყები"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="დასაწყები">დასაწყები</option>
          <option value="პროგრესში">პროგრესში</option>
          <option value="მზად ტესტირებისთვის">მზად ტესტირებისთვის</option>
          <option value="დასრულებული">დასრულებული</option>
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
        <label htmlFor="employee">პასუხისმგებელი თანამშრომელი*</label>
        <select
          id="employee"
          name="employee"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value=""></option>
          <option value="თანამშრომელი1">თანამშრომელი1</option>
          <option value="თანამშრომელი2">თანამშრომელი2</option>
        </select>
        <br />
        <label htmlFor="delivery-date">დედლაინი</label>
        <input
          name="delivery_date"
          type="date"
          value={formData.delivery_date}
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
