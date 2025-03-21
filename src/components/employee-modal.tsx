"use client";

import React, { useEffect, useState, useRef } from "react";
import EmployeeForm from "@/components/employee-form";
import { Department } from "@/types/department";

const EmployeeModal = ({ departments }: { departments: Department[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="border border-[#8338EC] rounded-sm    cursor-pointer  py-2.5 px-5 justify-center items-center"
      >
        თანამშრომლის შექმნა
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
          <div
            ref={menuRef}
            className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="font-semibold cursor-pointer"
              >
                X
              </button>
            </div>
            <EmployeeForm
              setIsModalOpen={setIsModalOpen}
              departments={departments}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeModal;
