import { useAppStore } from "~/store/useAppStore";
import { DataTypeHeadingBlock } from "./dataTypeItem";
import { DATA_TYPES } from "./types";

export const TypeConf = () => {
  const faculty = useAppStore((state) => state.config.faculty);

  return (
    <section className="mb-10 p-6 bg-white rounded-xl col-span-1 row-span-11 md:overflow-y-scroll transition-all duration-100 custom-scrollbar shadow-lg border border-gray-200 h-fit md:h-full">
      <div className="columns-1 sm:columns-2 gap-4">
        {DATA_TYPES.map((type) => {
          if (type.filter === "department") {
            if (faculty === "All") {
              return <></>;
            }
          }
          return <DataTypeHeadingBlock key={type.filter} type={type} />;
        })}
      </div>
    </section>
  );
};
