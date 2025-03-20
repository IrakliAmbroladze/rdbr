"use client";
import { Priority } from "@/types/priority";
import { fetchPriorities } from "@/utils/fetch-priorities";
import React, { useEffect, useState } from "react";

const filterOptions = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

const Filters = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  useEffect(() => {
    const loadPriorities = async () => {
      setPriorities(await fetchPriorities());
    };

    loadPriorities();
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
              {openModalIndex === 1 && (
                <form>
                  <fieldset>
                    <div className="flex flex-col">
                      {priorities.map((priority) => (
                        <label key={priority.id}>
                          <input
                            type="checkbox"
                            id={priority.name}
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
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Filters;
