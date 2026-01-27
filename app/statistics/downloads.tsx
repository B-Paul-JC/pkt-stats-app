import { Download } from "lucide-react";

// 1. Glob ALL years statically.
// We use '/*/*.png' to capture the year folder and the images inside.
// Note: keys will look like "../pocketStats/InfoStats/2023/page1.png"
const allModules = import.meta.glob("../pocketStats/*/*.pdf", {
  eager: true,
  as: "url",
});

const pdfs = (year: number): string[] => {
  // 2. Define the unique path segment for the requested year
  const searchPath = `/${year}/`;

  // 3. Filter keys to find only the ones matching that year
  const filteredKeys = Object.keys(allModules).filter((path) =>
    path.includes(searchPath),
  );

  if (filteredKeys.length === 0) {
    console.error(
      `No pdfs found for year ${year}! Check path: ../pocketStats/${year}/*.pdf`,
    );
    return [];
  }

  return filteredKeys
    .sort((a, b) => a.localeCompare(b)) // Sorts 01.png, 02.png correctly
    .map((key) => allModules[key] as string);
};

export const DownloadBtn = ({
  coords,
  text,
  color = "blue",
  year,
}: {
  text: string;
  color?: "blue" | string;
  coords: string;
  year: number;
}) => {
  return (
    <a
      href={pdfs(year)[0]}
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
