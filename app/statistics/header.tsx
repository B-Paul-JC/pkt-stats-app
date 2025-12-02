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
  <div className="w-full max-w-6xl mx-auto mb-4 bg-white p-4 rounded-xl shadow-2xl">
    <div className="flex items-center justify-between">
      {/* Document Title */}
      <div className="flex items-center space-x-3">
        <Image className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-extrabold truncate">{documentFileName}</h2>
      </div>

      {/* Page Indicator */}
      <div className="text-lg font-bold px-4 py-1 rounded-full shadow-inner min-w-[120px] text-center">
        Page <span className="text-yellow-400">{currentPage + 1}</span> of {totalPages}
      </div>
    </div>
  </div>
);
