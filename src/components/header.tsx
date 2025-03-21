import Link from "next/link";
import React from "react";
import EmployeeModal from "@/components/employee-modal";
import { Department } from "@/types/department";
import { fetchDepartments } from "@/utils/fetch-departments";

const Header = async () => {
  const departments: Department[] = await fetchDepartments();
  return (
    <div className="flex justify-between ">
      <Link href="/" className="cursor-pointer">
        Logo
      </Link>
      <div className="flex gap-1">
        <EmployeeModal departments={departments} />
        <Link href="/create-task" className="border cursor-pointer">
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
};

export default Header;
