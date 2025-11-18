import { useGlobalKeydown } from "~/customHooks/useGlobalKeydown";
import WordSphereTS from "./Grid";

export function Welcome() {
  useGlobalKeydown();

  return (
    <main className="py-10 px-16 h-dvh -z-50">
      <WordSphereTS />
    </main>
  );
}
