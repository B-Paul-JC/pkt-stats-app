import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButton } from "./navigationButton";
import { pages } from "./breakdowns";

export const ImageCarousel = ({
  currentPage,
  currentImageSrc,
  goToPrev,
  goToNext,
  goToPage,
  year,
}: {
  currentPage: number;
  currentImageSrc: string;
  goToNext: () => void;
  goToPrev: () => void;
  goToPage: (page: number) => void;
  year: number;
}) => {
  return (
    <div className="grid grid-cols-7 p-10 px-12">
      <div className="col-span-2">
        {/* Functional Sidebar with quick navigation using page titles mapped to page numbers */}
        <div className="grid grid-cols-3 gap-2 items-center justify-center h-full">
          {/* Group of links for each Page */}
          {pages[year].map((page) => (
            <button
              key={page.number}
              onClick={() => goToPage(page.number)}
              className={`my-2 px-4 py-1 rounded-md h-full ${
                currentPage === page.number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      </div>
      <div
        className="grow w-full max-w-6xl mx-auto rounded-xl shadow-2xl bg-white
                     relative flex items-center justify-center p-2 sm:p-4 col-span-5"
      >
        {/* Left Navigation Button */}
        <div className="absolute left-4 z-10">
          <NavigationButton
            onClick={goToPrev}
            disabled={false}
            icon={ChevronLeft}
            label="Previous Page"
            isVertical={true}
          />
        </div>
        <div className="h-full w-full max-w-4xl flex items-center justify-center overflow-hidden">
          <img
            key={currentPage}
            src={currentImageSrc}
            alt={`Page ${currentPage + 1} of the document`}
            className="h-full w-full object-contain rounded-lg animate-fade-in"
            style={{
              maxHeight: "calc(100vh - 200px)",
              aspectRatio: "800 / 1100",
            }}
          />
        </div>
        {/* Right Navigation Button */}
        <div className="absolute right-4 z-10">
          <NavigationButton
            onClick={goToNext}
            disabled={false}
            icon={ChevronRight}
            label="Next Page"
            isVertical={true}
          />
        </div>
      </div>
    </div>
  );
};
