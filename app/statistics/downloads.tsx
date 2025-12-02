import { Download } from "lucide-react";
import PDF_URL from "~/pocketStats/2023/INFOSTATISTIC.pdf";

export const DownloadBtn = ({
  coords,
  text,
  color = "blue",
}: {
  text: string;
  color?: "blue" | string;
  coords: string;
}) => {
  return (
    <a
      href={PDF_URL}
      download="University_Statistics_Report.pdf"
      className={`fixed ${coords} z-50 
                       flex items-center space-x-2 px-6 py-3 
                       bg-${color}-600 text-white font-bold rounded-full 
                       shadow-2xl hover:bg-${color}-700 transition-all duration-300 
                       hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-${color}-500/50`}
    >
      <Download className="w-5 h-5" />
      <span>{text}</span>
    </a>
  );
};
