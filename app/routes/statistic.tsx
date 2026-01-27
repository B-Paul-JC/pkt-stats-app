import React, { useState } from "react";
import type { Route } from "../routes/+types/statistic";
import { imagePages } from "~/statistics/images";
import { Header } from "~/statistics/header";
import { ImageCarousel } from "~/statistics/imageCarousel";
import { DownloadBtn } from "~/statistics/downloads";
import logo from "../../public/favicon.ico";
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
  // State: currentPage is 1-indexed for display
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [year, setYear] = useState<number>(2023);

  // Constants now derived from the image array
  const iPages = imagePages(year);
  const documentFileName: string = `University of Ibadan Statistics Report ${year}`;
  const totalPages: number = iPages.length;

  // Navigation handlers
  const goToPrev = () => {
    setCurrentPage((prev) => modulus(prev - 1, totalPages));
  };

  const goToNext = () => {
    setCurrentPage((prev) => modulus(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Get the current image source (array is 0-indexed, state is 1-indexed)
  const currentImageSrc = iPages[currentPage];

  return (
    <>
      <div className="flex-col h-screen w-full bg-white font-sans hidden sm:flex landscape:hidden sm:landscape:flex">
        <div className="shadow-blue-400 shadow flex justify-between items-center p-4">
          <Link
            to={"/"}
            download="University_Statistics_Report.pdf"
            className="p-3 bg-white text-slate-700 gap-2 rounded-full font-bold
           hover:shadow-blue-500 transition-all duration-100 transform active:outline-none active:ring-4 flex active:ring-blue-500/50"
          >
            <img src={logo} alt="" className="w-5 h-6.5" /> Home
          </Link>
          <div>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-md cursor-pointer"
            >
              <option value={2023} selected>
                2023
              </option>
            </select>
          </div>
          <Header {...{ documentFileName, currentPage, totalPages }} />
          <DownloadBtn year={year} text="Download" color="blue" coords="bottom-8 right-8" />
        </div>

        <ImageCarousel
          {...{
            currentImageSrc,
            currentPage,
            goToPrev,
            goToNext,
            goToPage,
            year,
          }}
        />
      </div>
      <ImageCarouselForMobile
        {...{year,
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
