import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButton } from "./navigationButton";

export const ImageCarousel = ({
  currentPage,
  currentImageSrc,
  goToPrev,
  goToNext,
  totalPages,
}: {
  currentPage: number;
  currentImageSrc: string;
  goToNext: () => void;
  goToPrev: () => void;
  totalPages: number;
}) => {
  return (
    <>
      <div
        className="grow w-full max-w-6xl mx-auto rounded-xl shadow-2xl bg-white 
                   relative flex items-center justify-center p-2 sm:p-4"
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
            // Key is essential to force re-render and trigger the transition effect when the image changes
            key={currentPage}
            src={currentImageSrc}
            alt={`Page ${currentPage + 1} of the document`}
            // Added animation class for a subtle fade-in transition on page change
            className="h-full w-full object-contain shadow-lg rounded-lg animate-fade-in"
            style={{
              maxHeight: "calc(100vh - 200px)", // Constrain image height on tall screens
              aspectRatio: "800 / 1100", // Maintain standard page aspect ratio
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

        {/* Footer Hint */}
      </div>
      <p className="mt-4 text-center text-sm text-gray-500 max-w-6xl mx-auto">
        Report Viewer: Click the side arrows to navigate pages (
        {currentPage + 1} / {totalPages}).
      </p>
    </>
  );
};
