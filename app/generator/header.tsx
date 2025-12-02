import { Home } from "lucide-react";
import { Link } from "react-router";
import logo from "../../public/favicon.ico";

export const Header = () => {
  return (
    <header className="bg-white shadow-2xl rounded-2xl p-6 col-span-2 flex items-center justify-between">
      <h2 className="font-bold flex items-center">
        <img src={logo} className="w-8 h-10" alt="" />
        <span className="p-2 text-sm">
          University of Ibadan
          <br />
          <span className="text-yellow-500">Info Statistics</span>
        </span>
      </h2>
      <p className="flex gap-5 items-center">
        Select your desired filters{" "}
        <Link to="/" className="bg-yellow-500 rounded-full shadow-xl text-white p-2">
          <Home />
        </Link>
      </p>
    </header>
  );
};
