import { Link } from "react-router";
import logo from "../../public/favicon.ico";

export const SidePanel = () => {
  return (
    <section className="p-8 col-start-1 grid lg:grid-cols-12 lg:grid-rows-6 justify-center items-center col-span-1 h-1/2 row-span-1 lg:h-full">
      <section className="bg-white shadow-lg rounded-lg col-span-12 lg:row-span-3  lg:row-start-2 lg:h-full grid gap-6 lg:gap-4 items-center justify-items-start lg:grid-rows-3 grid-cols-1 p-10 pop-in-animation">
        <h2 className="font-bold row-span-2 flex items-center">
          <img src={logo} className="w-8 h-10 lg:w-30 lg:h-35" alt="" />
          <span className="p-2 text-sm lg:text-5xl lg:p-9">
            University of Ibadan
            <br />
            <span className="text-yellow-500">Info Statistics</span>
          </span>
        </h2>
        <p className="row-span-1 lg:row-span-2 text-sm md:text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum natus at
          culpa quia molestiae neque cupiditate velit ad? Molestiae consequatur
          adipisci voluptatum, cumque, quibusdam architecto neque quasi aperiam,
          aut recusandae est ea quod fuga. Saepe recusandae iste minima et
          aliquid, error dignissimos voluptas id eaque voluptate, vel esse quod
          neque.
        </p>
        <div className="flex flex-col text-center md:flex-row gap-3 justify-items-center w-full row-span-1">
          <Link
            to={"/statistics"}
            className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 cursor-pointer rounded-lg"
          >
            View Statistics
          </Link>
          <Link
            to={"/generate-stats"}
            className="px-4 py-2 border-yellow-600 border-2 hover:bg-yellow-400 hover:border-yellow-400 cursor-pointer rounded-lg hover:text-white htransition-all"
          >
            Generate Statistical Data
          </Link>
        </div>
      </section>
    </section>
  );
};
