import React from "react";
import RandomGrid from "../designs/RandomGrid";

const Grid: React.FC = () => {
  // Generate 10 buttons with random positions
  const myButtons = [
    {
      id: "1",
      label: "Excellence",
      randomX: 70,
      randomY: 20,
      randX: 80,
      randY: -10,
    },
    {
      id: "2",
      label: "Research",
      randomX: 60,
      randomY: 20,
      randX: 70,
      randY: 20,
    },
    {
      id: "3",
      label: "Staff",
      randomX: 50,
      randomY: 20,
      randX: 50,
      randY: -10,
    },
    {
      id: "4",
      label: "Departments",
      randomX: 40,
      randomY: 20,
      randX: 35,
      randY: 20,
    },
    {
      id: "5",
      label: "University",
      randomX: 30,
      randomY: 20,
      randX: 20,
      randY: -10,
    },
    {
      id: "6",
      label: "Population",
      randomX: 70,
      randomY: 90,
      randX: 20,
      randY: 115,
    },
    {
      id: "7",
      label: "Faculty",
      randomX: 60,
      randomY: 90,
      randX: 35,
      randY: 85,
    },
    {
      id: "8",
      label: "Alumni",
      randomX: 50,
      randomY: 90,
      randX: 50,
      randY: 115,
    },
    {
      id: "9",
      label: "Rankings",
      randomX: 40,
      randomY: 90,
      randX: 70,
      randY: 85,
    },
    {
      id: "10",
      label: "Students",
      randomX: 30,
      randomY: 90,
      randX: 80,
      randY: 115,
    },
  ];

  return (
    <>
      <div className="z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-64 md:w-96">
        <img src="/ui-logo.png" alt="" />
      </div>
      <div className="h-full flex items-center justify-center">
        <RandomGrid buttons={myButtons} />
      </div>
    </>
  );
};

export default Grid;
