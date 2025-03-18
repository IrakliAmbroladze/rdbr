"use client";
import { EmployeeFormData } from "@/types/employee";
import { createEmployee } from "@/utils/create-employee";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

export default function EmployeeForm(): JSX.Element {
  const initialFormData: EmployeeFormData = {
    name: "",
    surname: "",
    avatar: null,
    department_id: 2,
  };
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!formData.avatar) return;
    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    try {
      await createEmployee(formData);
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error:", error);
    }

    setFormData(initialFormData);
    setPreview(null);

    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">თანამშრომლის დამატება</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4">
          <div className="space-y-4">
            <label htmlFor="name">სახელი*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label htmlFor="surname">გვარი*</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <label htmlFor="avatar">ავატარი*</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
            {preview && (
              <div className="flex justify-center">
                <Image
                  src={preview}
                  alt="Address Preview"
                  className="mt-2 w-40 h-40 rounded"
                  width={900}
                  height={900}
                />
              </div>
            )}
            <label htmlFor="department">დეპარტამენტი*</label>
            <select
              id="department"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value={1}>ადმინისტრაციის დეპარტამენტი</option>
              <option value={2}>დიზაინის დეპარტამენტი</option>
            </select>
            <br />
          </div>
          <div className="space-y-4"></div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-gray-300" : "bg-blue-500"
          } text-white p-2 rounded`}
        >
          {isSubmitting ? "Adding Employee..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}
