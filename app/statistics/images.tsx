// 1. Glob ALL years statically.
// We use '/*/*.png' to capture the year folder and the images inside.
// Note: keys will look like "../pocketStats/InfoStats/2023/page1.png"
const allModules = import.meta.glob("../pocketStats/InfoStats/*/*.png", {
  eager: true,
  as: "url",
});

export const imagePages = (year: number): string[] => {
  // 2. Define the unique path segment for the requested year
  const searchPath = `/InfoStats/${year}/`;

  // 3. Filter keys to find only the ones matching that year
  const filteredKeys = Object.keys(allModules).filter((path) =>
    path.includes(searchPath),
  );

  if (filteredKeys.length === 0) {
    console.error(
      `No images found for year ${year}! Check path: ../pocketStats/InfoStats/${year}/*.png`,
    );
    return [];
  }

  return filteredKeys
    .sort((a, b) => a.localeCompare(b)) // Sorts 01.png, 02.png correctly
    .map((key) => allModules[key] as string);
};
