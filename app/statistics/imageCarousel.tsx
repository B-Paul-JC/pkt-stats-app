import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavigationButton } from "./navigationButton";

export const ImageCarousel = ({
  currentPage,
  currentImageSrc,
  goToPrev,
  goToNext,
}: {
  currentPage: number;
  currentImageSrc: string;
  goToNext: () => void;
  goToPrev: () => void;
}) => {
  return (
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
  );
};
