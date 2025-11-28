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
      <div className="flex items-center space-x-3 text-yellow-500">
        <Image className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-extrabold truncate">{documentFileName}</h2>
      </div>

      {/* Page Indicator */}
      <div className="text-lg font-bold text-yellow-300 bg-yellow-700/70 px-4 py-1 rounded-full shadow-inner min-w-[120px] text-center">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  </div>
);
