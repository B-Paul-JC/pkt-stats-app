import { Image } from "lucide-react";

export const Header = ({
  documentFileName,
  currentPage,
  totalPages,
}: {
  documentFileName: string;
  currentPage: number;
  totalPages: number;
}) => (
  <div className="flex items-center justify-between gap-5">
    {/* Document Title */}
    <div className="flex items-center space-x-3">
      <Image className="w-6 h-6 text-blue-400" />
      <h2 className="font-extrabold truncate">{documentFileName}</h2>
    </div>

    {/* Page Indicator */}
    <div className="text-lg font-bold px-4 py-1 rounded-full shadow-inner min-w-30 text-center">
      Page <span className="text-blue-400">{currentPage + 1}</span> of{" "}
      {totalPages}
    </div>
  </div>
);
