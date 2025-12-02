import React, { useState } from "react";
import type { Route } from "../routes/+types/statistic";
import { imagePages } from "~/statistics/images";
import { Header } from "~/statistics/header";
import { ImageCarousel } from "~/statistics/imageCarousel";
import { DownloadBtn } from "~/statistics/downloads";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { ImageCarouselForMobile } from "~/statistics/carouselForMobile";

const modulus = (dividend: number, divisor: number): number => {
  const remainder = dividend % divisor;

  if (remainder < 0) {
    return remainder + divisor;
  }

  return remainder;
};

const PDFViewer: React.FC = () => {
  // Constants now derived from the image array
  const documentFileName: string =
    "University of Ibadan Statistics Report 2023";
  const totalPages: number = imagePages.length;

  // State: currentPage is 1-indexed for display
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Navigation handlers
  const goToPrev = () => {
    setCurrentPage((prev) => modulus(prev - 1, totalPages));
  };

  const goToNext = () => {
    setCurrentPage((prev) => modulus(prev + 1, totalPages));
  };

  // Get the current image source (array is 0-indexed, state is 1-indexed)
  const currentImageSrc = imagePages[currentPage];

  return (
    <>
      <div className="flex-col h-screen w-full bg-white font-sans p-4 sm:p-8 hidden sm:flex landscape:hidden sm:landscape:flex">
        <Link
          to={"/"}
          download="University_Statistics_Report.pdf"
          className="fixed top-8 left-8 z-50 px-6 py-3 
        bg-yellow-600 text-white rounded-full font-bold 
        shadow-2xl hover:bg-yellow-700 transition-all duration-100 
        hover:scale-105 transform active:outline-none active:ring-4 active:ring-yellow-500/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <DownloadBtn text="Download" color="yellow" coords="bottom-8 right-8" />
        <Header {...{ documentFileName, currentPage, totalPages }} />

        <ImageCarousel
          {...{ currentImageSrc, currentPage, goToPrev, goToNext }}
        />
      </div>
      <ImageCarouselForMobile
        {...{
          currentImageSrc,
          currentPage,
          goToPrev,
          goToNext,
          totalPages,
          documentFileName,
        }}
      />
    </>
  );
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "University of Ibadan Info Statistics Carousel" },
    {
      name: "description",
      content:
        "View the current statistical data for the Univeristy of Ibadan in a sleek image carousel.",
    },
  ];
}

export default PDFViewer;
