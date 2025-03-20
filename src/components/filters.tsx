"use client";
import React, { useEffect, useState } from "react";
import { Department } from "@/types/department";
import { Priority } from "@/types/priority";
import { Employee } from "@/types/employee";
import { fetchPriorities } from "@/utils/fetch-priorities";
import { fetchDepartments } from "@/utils/fetch-departments";
import { fetchEmployees } from "@/utils/fetch-employees";

const filterOptions = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

const Filters = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

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
                <form>
                  <fieldset>
                    <div className="flex flex-col">
                      {departments.map((department) => (
                        <label key={department.id}>
                          <input
                            type="checkbox"
                            id={department.id.toString()}
                            name="departments"
                            value={department.id}
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
                <form>
                  <fieldset>
                    <div className="flex flex-col">
                      {priorities.map((priority) => (
                        <label key={priority.id}>
                          <input
                            type="checkbox"
                            id={priority.id.toString()}
                            name="priorities"
                            value={priority.id}
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
                <form>
                  <fieldset>
                    <div className="flex flex-col">
                      {employees.map((employee) => (
                        <label key={employee.id}>
                          <input
                            type="checkbox"
                            id={employee.id.toString()}
                            name="employees"
                            value={employee.id}
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
