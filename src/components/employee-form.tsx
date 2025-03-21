"use client";
import { Department } from "@/types/department";
import { EmployeeFormData } from "@/types/employee";
import { createEmployee } from "@/utils/create-employee";
import Image from "next/image";
import { JSX, useEffect, useState } from "react";

export default function EmployeeForm({
  setIsModalOpen,
  departments,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  departments: Department[];
}): JSX.Element {
  const initialFormData: EmployeeFormData = {
    name: "",
    surname: "",
    avatar: null,
    department_id: 1,
  };
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidName, setisValidName] = useState<null | boolean>(null);
  const [isValidSurname, setisValidSurname] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formData.avatar) return;
    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatar]);

  const validateInput = (value: string) => {
    const regex = /^[a-zA-Z\u10D0-\u10FF]*$/;
    return regex.test(value) && value.length >= 2 && value.length <= 255;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    const regex = /^[a-zA-Z\u10D0-\u10FF]*$/;

    if (name === "name" && (regex.test(value) || value === "")) {
      if (value.length === 0) {
        setisValidName(null);
      } else if (value.length < 2 || value.length > 255) {
        setisValidName(false);
      } else {
        setisValidName(true);
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    if (name === "surname" && (regex.test(value) || value === "")) {
      if (value.length === 0) {
        setisValidSurname(null);
      } else if (value.length < 2 || value.length > 255) {
        setisValidSurname(false);
      } else {
        setisValidSurname(true);
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file && file.size > 600 * 1024) {
        setError("ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს.");
        return;
      }
      setError(null);
      setFormData((prev) => ({ ...prev, [name]: file }));
      return;
    }
    if (name === "department_id") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInput(formData.name) || !validateInput(formData.surname)) {
      setError("ფორმა შეიცავს არასწორ მონაცემებს!");
      return;
    }

    setIsSubmitting(true);
    try {
      await createEmployee(formData);
      setError(null);
      alert("ფორმა წარმატებით გაიგზავნა!");
    } catch (error) {
      console.error("Error:", error);
    }

    setFormData(initialFormData);
    setPreview(null);

    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setIsSubmitting(false);
  };

  const handleDelete = () => {
    setPreview(null);
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
              className={`w-full p-2 border rounded transition-colors ${
                isValidName === null
                  ? "border-gray-400"
                  : isValidName
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            <div
              className={`text-sm ${
                isValidName === null
                  ? "text-gray-400"
                  : isValidName
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <div>მინ 2 სიმბ.</div>
              <div>მაქს. 255 სიმბ.</div>
            </div>

            <label htmlFor="surname">გვარი*</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded transition-colors ${
                isValidSurname === null
                  ? "border-gray-400"
                  : isValidSurname
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
            <div
              className={`text-sm ${
                isValidSurname === null
                  ? "text-gray-400"
                  : isValidSurname
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <div>მინ 2 სიმბ.</div>
              <div>მაქს 255 სიმბ.</div>
            </div>

            <label htmlFor="avatar">ავატარი*</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            {preview && (
              <div className="flex flex-col items-center mt-2">
                <Image
                  src={preview}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded"
                  width={900}
                  height={900}
                />
                <button
                  onClick={handleDelete}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded transition-transform active:scale-95"
                >
                  წაშლა
                </button>
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
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-end gap-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 p-2 rounded cursor-pointer transition-transform active:scale-95"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`p-2 rounded cursor-pointer text-white transition-transform active:scale-95 ${
                  isSubmitting ? "bg-gray-300" : "bg-blue-500"
                }`}
              >
                {isSubmitting
                  ? "თანამშრომლის დამატება..."
                  : "დაამატე თანამშრომელი"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
