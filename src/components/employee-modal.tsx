"use client";

import React, { useState } from "react";
import EmployeeForm from "@/components/employee-form";

const EmployeeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="border cursor-pointer"
      >
        თანამშრომლის შექმნა
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-h-[80vh] w-[90%] md:w-[50%] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="font-semibold cursor-pointer"
              >
                X
              </button>
            </div>
            <EmployeeForm />
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeModal;
