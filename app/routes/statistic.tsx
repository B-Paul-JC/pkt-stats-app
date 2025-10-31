import { Link, useParams } from "react-router";
import type { Route } from "./+types/home";
import { FiArrowLeft } from "react-icons/fi";
import { PieCT } from "../charts/pie";
import { useState, type ReactNode } from "react";
import { SimpleBarChart } from "~/charts/bar";
import { StackedAreaChart } from "~/charts/range";
import { GeneralInfo } from "~/analytics/generalInfo";
import { BottomDrawer } from "~/analytics/mobileDrawer";
import { EditLogic } from "~/analytics/editLogic";
import { LoginModal } from "~/auth/modal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "University of Ibadan Pocket Statistics" },
    {
      name: "description",
      content: "View the current statistical data for the Univeristy of Ibadan",
    },
  ];
}

export default function Statistic() {
  const [isOpen, setIsOpen] = useState(false);
  const { sid } = useParams();

  const Cells: ReactNode[] = [
    <StackedAreaChart />,
    <PieCT />,
    <EditLogic defunct={setIsOpen} />,
    <SimpleBarChart />,
    <GeneralInfo />,
  ];

  return (
    <>
      <LoginModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <Link
        to="/"
        className="fixed top-6 left-6 px-3 py-2 bg-white rounded-full shadow hover:bg-gray-100 z-200 cursor-pointer"
      >
        <FiArrowLeft />
      </Link>

      <div className="anim-in-view fixed z-30 p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-11/12 bg-blue-100 overflow-scroll sm:overflow-clip rounded-2xl bg-opacity-90 shadow-2xl transition-all duration-700 opacity-0 scale-95 animate-fade-in">
        <div className="flex-row sm:grid grid-cols-8 grid-rows-8 gap-4 p-4 items-center h-full">
          <div className="row-span-1 mb-4 sm:mb-0 sm:h-full bg-white p-4 rounded shadow col-span-2">
            <h2 className="font-bold capitalize">{sid} Statistics</h2>
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="row-span-4 mb-4 sm:mb-0 h-96 sm:h-full bg-white rounded col-span-3 shadow py-6 px-2 sm:p-7 relative flex items-center justify-center"
            >
              {Cells[index]}
            </div>
          ))}
          <div className="row-span-7 mb-4 sm:mb-0 h-96 sm:h-full col-span-2 bg-white p-4 rounded shadow items-center justify-center hidden sm:flex">
            {Cells[2]}
          </div>
          <div className="row-span-4 col-span-4 h-96 mb-4 sm:mb-0 sm:h-full bg-white rounded shadow p-7 relative flex items-center justify-center">
            {Cells[3]}
          </div>
          <div className="row-span-4 col-span-2 h-96 mb-4 sm:mb-0 sm:h-full bg-white rounded shadow p-7 relative flex items-center justify-center">
            {Cells[4]}
          </div>
        </div>
      </div>
      <BottomDrawer defunct={setIsOpen} />
    </>
  );
}
