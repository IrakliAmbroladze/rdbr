import React from "react";

const filterOptions = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

const Filters = () => {
  return (
    <ul className="flex gap-2.5 ">
      {filterOptions.map((option, index) => (
        <li key={index} className="cursor-pointer">
          {option}
        </li>
      ))}
    </ul>
  );
};

export default Filters;
