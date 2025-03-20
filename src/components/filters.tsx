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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>,
    filterName: string
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    if (Object.keys(formData).length === 0) {
      params.delete(filterName);
    }

    formData.forEach((_, key) => {
      params.delete(key);
    });

    formData.forEach((value, key) => {
      params.append(key, value as string);
    });
    router.push(`?${params.toString()}`);
    setTimeout(() => {
      if (openModalIndex != null) {
        setOpenModalIndex(null);
      }
    }, 1000);
  };

  useEffect(() => {
    const loadData = async () => {
      setPriorities(await fetchPriorities());
      setDepartments(await fetchDepartments());
      setEmployees(await fetchEmployees());
    };

    loadData();
  }, []);

  const renderFilterModal = (
    filterType: "departments" | "priorities" | "employees",
    filterData: Department[] | Priority[] | Employee[],
    isCheckbox: boolean
  ) => {
    return (
      <form onSubmit={(e) => handleSubmit(e, filterType)}>
        <fieldset>
          <div className="flex flex-col">
            {filterData.map((item) => (
              <label key={item.id}>
                <input
                  type={isCheckbox ? "checkbox" : "radio"}
                  id={item.id.toString()}
                  name={filterType}
                  value={item.id}
                  defaultChecked={searchParams
                    .getAll(filterType)
                    .includes(item.id.toString())}
                />
                {isCheckbox
                  ? item.name
                  : "surname" in item
                  ? `${item.name} ${item.surname}`
                  : item.name}
              </label>
            ))}
          </div>

          <div>
            <button type="submit">არჩევა</button>
          </div>
        </fieldset>
      </form>
    );
  };

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
              {openModalIndex === 0 &&
                renderFilterModal("departments", departments, true)}
              {openModalIndex === 1 &&
                renderFilterModal("priorities", priorities, true)}
              {openModalIndex === 2 &&
                renderFilterModal("employees", employees, false)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Filters;
