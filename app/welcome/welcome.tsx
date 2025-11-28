import { useGlobalKeydown } from "~/customHooks/useGlobalKeydown";
import { CustomGrid } from "./CustomGrid";
import { SidePanel } from "./SidePanel";

export function Welcome() {
  useGlobalKeydown();

  return (
    <main className="lg:bg-gradient-to-b bg-yellow-700 lg:from-45% lg:to-45% lg:from-yellow-600 lg:to-white lg:grid grid-cols-2 lg:gap-4 lg:px-20 py-4 h-svh grid-rows-1 items-center overflow-y-scroll lg:overflow-clip">
      <CustomGrid />
      <SidePanel />
    </main>
  );
}
