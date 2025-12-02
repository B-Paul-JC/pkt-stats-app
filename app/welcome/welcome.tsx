import { useGlobalKeydown } from "~/customHooks/useGlobalKeydown";
import { CustomGrid } from "./CustomGrid";
import { SidePanel } from "./SidePanel";

export function Welcome() {
  useGlobalKeydown();

  return (
    <main className="lg:bg-linear-to-b lg:from-45% lg:to-45% lg:from-yellow-600 lg:to-white lg:grid grid-cols-2 lg:gap-4 lg:px-20 py-4 sm:h-svh sm:grid-rows-1 items-center overflow-y-scroll lg:overflow-clip">
      <SidePanel />
      <CustomGrid />
      <div className="h-20 lg:hidden"></div>
    </main>
  );
}
