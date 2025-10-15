import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Research() {
  return (
    <div className="anim-in-view fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-11/12 bg-blue-100 rounded-2xl bg-opacity-90 flex flex-col items-center justify-center shadow-2xl 100 transition-all duration-700 opacity-0 scale-95 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Research Page</h2>
      <p className="text-gray-700">This is the research page content.</p>
    </div>
  );
}
