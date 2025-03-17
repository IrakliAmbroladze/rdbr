import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between ">
      <button className="cursor-pointer">Logo</button>
      <div className="flex gap-1">
        <button className="border cursor-pointer">თანამშრომლის შექმნა</button>
        <button className="border cursor-pointer">
          + შექმენი ახალი დავალება
        </button>
      </div>
    </div>
  );
};

export default Header;
