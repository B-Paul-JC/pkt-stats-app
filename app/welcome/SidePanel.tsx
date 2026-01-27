import { Link } from "react-router";
import logo from "../../public/favicon.ico";

export const SidePanel = () => {
  return (
    <section className="p-8 col-start-1 grid lg:grid-cols-12 lg:grid-rows-6 justify-center items-center col-span-1 h-1/2 row-span-1 lg:h-full">
      <section className="bg-white shadow-lg rounded-lg col-span-12 lg:row-span-4 lg:row-start-2 lg:h-full grid gap-6 lg:gap-4 items-center justify-items-start lg:grid-rows-3 grid-cols-1 p-10 pop-in-animation max-h-110">
        <h2 className="font-bold row-span-2 flex items-center">
          <img src={logo} className="w-8 h-10 lg:w-15 lg:h-20" alt="" />
          <span className="p-2 text-sm lg:text-2xl lg:p-9">
            University of Ibadan
            <br />
            <span className="text-blue-500">Info Statistics</span>
          </span>
        </h2>
        <p className="row-span-1 lg:row-span-2 text-sm md:text-md lg:text-sm">
          Established in 1948, the University of Ibadan, UI as it is fondly
          referred to, is the first University in Nigeria. Until 1962 when it
          became a full-fledged independent University, it was a College of the
          University of London in a special relationship scheme. The University,
          which took off with academic programmes in three (3) faculties, is now
          a comprehensive citadel of learning with academic programmes in
          nineteen (19) Faculties!!
        </p>
        <div className="flex flex-col text-center md:flex-row gap-3 justify-items-center w-full row-span-1">
          <Link
            to={"/statistics"}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-lg"
          >
            View Statistics
          </Link>
          <Link
            to={"/generate-stats"}
            className="px-4 py-2 border-blue-600 border-2 hover:bg-blue-400 hover:border-blue-400 cursor-pointer rounded-lg hover:text-white htransition-all"
          >
            Generate Statistical Data
          </Link>
        </div>
      </section>
    </section>
  );
};
