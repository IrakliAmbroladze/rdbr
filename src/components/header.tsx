import Link from "next/link";
import React from "react";
import EmployeeModal from "@/components/employee-modal";
import { Department } from "@/types/department";
import { fetchDepartments } from "@/utils/fetch-departments";
import Image from "next/image";

const Header = async () => {
  const departments: Department[] = await fetchDepartments();
  return (
    <div className="fixed top-0 z-50 bg-white flex justify-between w-[1920px] h-[100px] py-[30px] px-[120px]">
      <Link href="/" className="cursor-pointer">
        <Image src={"/icons/logo.svg"} alt="logo" width={210} height={38} />
      </Link>
      <div className="flex gap-10 w-[533px]">
        <EmployeeModal departments={departments} />
        <Link
          href="/create-task"
          className="border border-[#8338EC] rounded-sm bg-[#8338EC] cursor-pointer py-2.5 px-5 text-white  "
        >
          + შექმენი ახალი დავალება
        </Link>
      </div>
    </div>
  );
};

export default Header;
