import Link from "next/link";
import React from "react";
import EmployeeModal from "@/components/employee-modal";

const Header = () => {
  return (
    <div className="flex justify-between ">
      <Link href="/" className="cursor-pointer">
        Logo
      </Link>
      <div className="flex gap-1">
        <EmployeeModal />
        <Link href="/create-task" className="border cursor-pointer">
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
};

export default Header;
