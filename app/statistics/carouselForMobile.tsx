import { ChevronLeft, ChevronRight, Image } from "lucide-react";
import { NavigationButton } from "./navigationButton";
import { DownloadBtn } from "./downloads";

export const ImageCarouselForMobile = ({
  currentPage,
  currentImageSrc,
  goToPrev,
  goToNext,
  totalPages,
  documentFileName,
}: {
  currentPage: number;
  currentImageSrc: string;
  goToNext: () => void;
  goToPrev: () => void;
  totalPages: number;
  documentFileName: string;
}) => {
  return (
    <>
      <div
        className="grow w-full sm:hidden flex-col mx-auto rounded-xl h-screen shadow-2xl  
      relative overflow-hidden flex items-center justify-center p-2"
      >
        <DownloadBtn
          coords="top-22 landscape:left-0 landscape:top-80 landscape:scale-80"
          text="Download"
          color="yellow"
        />
        <div className="absolute top-10 landscape:top-105 z-100 items-center flex-col justify-items-center">
          <p className="font-bold text-xl text-center">{documentFileName}</p>
        </div>
        <div className="absolute left-52 landscape:left-10 landscape:top-52 bottom-20 z-10">
          <NavigationButton
            onClick={() => {}}
            disabled={"special"}
            icon={() => (
              <p className="text-black">
                Page <br />{" "}
                <span className="text-yellow-400">{currentPage + 1}</span>
                <br /> <span>/{totalPages}</span>
              </p>
            )}
            label="Previous Page"
            isVertical={true}
          />
        </div>
        {/* Left Navigation Button (Smaller for mobile) */}
        <div className="absolute left-32 bottom-20 z-10 landscape:left-11/12 landscape:scale-125 landscape:bottom-32">
          <NavigationButton
            onClick={goToPrev}
            disabled={false}
            icon={ChevronLeft}
            label="Previous Page"
            isVertical={true}
          />
        </div>
        {/* Image Display Area */}
        <div className="h-full w-full flex items-center landscape:scale-87 portrait:scale-150 portrait:rotate-90 justify-center overflow-hidden">
          {totalPages > 0 ? (
            <img
              key={currentPage}
              src={currentImageSrc}
              alt={`Page ${currentPage} of the document`}
              className="h-full w-full object-contain rounded-lg animate-fade-in"
            />
          ) : (
            <div className="text-gray-400 text-center p-10">
              <Image className="w-16 h-16 mx-auto mb-4" />
              <p className="font-semibold">No images loaded.</p>
              <p className="text-sm">
                Please check the image path in statistic.tsx:{" "}
                <code className="text-indigo-400">
                  /src/assets/stat-images/INFOSTATISTIC_*.png
                </code>
              </p>
            </div>
          )}
        </div>
        {/* Right Navigation Button (Smaller for mobile) */}
        <div className="absolute right-32 bottom-20 z-10 landscape:left-11/12 landscape:scale-125 landscape:bottom-64">
          <NavigationButton
            onClick={goToNext}
            disabled={false}
            icon={ChevronRight}
            label="Next Page"
            isVertical={true}
          />
        </div>
      </div>
    </>
  );
};
