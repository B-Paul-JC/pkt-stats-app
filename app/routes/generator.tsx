import { SchoolStatsApp } from "~/generator/main";
import type { Route } from "./+types/generator";
import { ProtectedRoute } from "~/ProtectedRoute";

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
    <ProtectedRoute>
      <SchoolStatsApp />
    </ProtectedRoute>
  );
}

export default Generator