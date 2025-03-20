"use client";
import React, { useEffect, useState } from "react";
import { Department } from "@/types/department";
import { Priority } from "@/types/priority";
import { Employee } from "@/types/employee";
import { fetchPriorities } from "@/utils/fetch-priorities";
import { fetchDepartments } from "@/utils/fetch-departments";
import { fetchEmployees } from "@/utils/fetch-employees";
import { useSearchParams, useRouter } from "next/navigation";

const filterOptions = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

const Filters = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmitDeparments = (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log("formData is: ", formData);
    console.log("type of formData is: ", typeof formData);
    if (Object.keys(formData).length === 0) {
      params.delete("departments");
    }
    formData.forEach((_, key) => {
      console.log(key);
      params.delete(key);
    });

    formData.forEach((value, key) => {
      params.append(key, value as string);
    });

    router.push(`?${params.toString()}`);
  };

  const handleSubmitPriorities = (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log("formData is: ", formData);
    console.log("type of formData is: ", typeof formData);
    if (Object.keys(formData).length === 0) {
      params.delete("priorities");
    }
    formData.forEach((_, key) => {
      console.log(key);
      params.delete(key);
    });

    formData.forEach((value, key) => {
      params.append(key, value as string);
    });

    router.push(`?${params.toString()}`);
  };

  const handleSubmitEmployees = (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log("formData is: ", formData);
    console.log("type of formData is: ", typeof formData);
    if (Object.keys(formData).length === 0) {
      params.delete("employees");
    }
    formData.forEach((_, key) => {
      console.log(key);
      params.delete(key);
    });

    formData.forEach((value, key) => {
      params.append(key, value as string);
    });

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const loadData = async () => {
      setPriorities(await fetchPriorities());
      setDepartments(await fetchDepartments());
      setEmployees(await fetchEmployees());
    };

    loadData();
  }, []);

  return (
    <ul className="flex gap-2.5">
      {filterOptions.map((option, index) => (
        <li key={index} className="cursor-pointer">
          <button
            onClick={() =>
              setOpenModalIndex(openModalIndex === index ? null : index)
            }
          >
            {option}
          </button>
          {openModalIndex === index && (
            <div>
              {openModalIndex === 0 && (
                <form onSubmit={handleSubmitDeparments}>
                  <fieldset>
                    <div className="flex flex-col">
                      {departments.map((department) => (
                        <label key={department.id}>
                          <input
                            type="checkbox"
                            id={department.id.toString()}
                            name="departments"
                            value={department.id}
                            defaultChecked={searchParams
                              .getAll("departments")
                              .includes(department.id.toString())}
                          />
                          {department.name}
                        </label>
                      ))}
                    </div>

                    <div>
                      <button type="submit">არჩევა</button>
                    </div>
                  </fieldset>
                </form>
              )}
              {openModalIndex === 1 && (
                <form onSubmit={handleSubmitPriorities}>
                  <fieldset>
                    <div className="flex flex-col">
                      {priorities.map((priority) => (
                        <label key={priority.id}>
                          <input
                            type="checkbox"
                            id={priority.id.toString()}
                            name="priorities"
                            value={priority.id}
                            defaultChecked={searchParams
                              .getAll("priorities")
                              .includes(priority.id.toString())}
                          />
                          {priority.name}
                        </label>
                      ))}
                    </div>

                    <div>
                      <button type="submit">არჩევა</button>
                    </div>
                  </fieldset>
                </form>
              )}
              {openModalIndex === 2 && (
                <form onSubmit={handleSubmitEmployees}>
                  <fieldset>
                    <div className="flex flex-col">
                      {employees.map((employee) => (
                        <label key={employee.id}>
                          <input
                            type="radio"
                            id={employee.id.toString()}
                            name="employees"
                            value={employee.id}
                            defaultChecked={searchParams
                              .getAll("employees")
                              .includes(employee.id.toString())}
                          />
                          {employee.name} {employee.surname}
                        </label>
                      ))}
                    </div>

                    <div>
                      <button type="submit">არჩევა</button>
                    </div>
                  </fieldset>
                </form>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Filters;
