import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Image } from "lucide-react";
import type { Route } from "../routes/+types/statistic";
import { NavigationButton } from "~/statistics/navigationButton";
import { imagePages } from "~/statistics/images";
import { Header } from "~/statistics/header";
import { ImageCarousel } from "~/statistics/imageDisplay";

const modulus = (dividend: number, divisor: number): number => {
  const remainder = dividend % divisor;

  if (remainder < 0) {
    return remainder + divisor;
  }

  return remainder;
};

const PDFViewer: React.FC = () => {
  // Constants now derived from the image array
  const documentFileName: string = "University Statistics Report";
  const totalPages: number = imagePages.length;

  // State: currentPage is 1-indexed for display
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Navigation handlers
  const goToPrev = () => {
    setCurrentPage((prev) => modulus(prev - 1, totalPages - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => modulus(prev + 1, totalPages - 1));
  };

  // Get the current image source (array is 0-indexed, state is 1-indexed)
  const currentImageSrc = imagePages[currentPage];

  return (
    <div className="flex flex-col h-screen w-full bg-white font-sans p-4 sm:p-8">
      <Header {...{ documentFileName, currentPage, totalPages }} />

      <ImageCarousel
        {...{ currentImageSrc, currentPage, goToPrev, goToNext, totalPages }}
      />

      {/* Custom Tailwind Animation CSS */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0.5; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
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
