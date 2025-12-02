import { ChartConfiguration } from "~/generator/main";
import type { Route } from "./+types/generator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "University of Ibadan Info Statistics Generator" },
    {
      name: "description",
      content: "Generate statistical data for the Univeristy of Ibadan",
    },
  ];
}

const Generator = () => {
  return (
    <>
      <ChartConfiguration />
    </>
  );
}

export default Generator