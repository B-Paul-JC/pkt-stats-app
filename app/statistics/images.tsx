const modules = import.meta.glob(
  "../dummyData/InfoStats/INFOSTATISTIC_*.png",
  { eager: true, as: "url" }
);

// 2. PROCESS AND SORT THE IMPORTS
// Convert the object of imports into a sorted array of URLs.
// This is necessary because Vite's glob might return them in an arbitrary order.
// We sort them based on the filename (e.g., ...00001 before ...00025).
export const imagePages: string[] = Object.keys(modules)
  .sort((a, b) => {
    // Simple string comparison works here due to the zero-padded numbering
    return a.localeCompare(b);
  })
  .map((key) => modules[key] as string);

// Check if images were loaded (for debugging)
if (imagePages.length === 0) {
  console.error(
    "No images found! Check the glob path: ../dummyData/InfoStats/INFOSTATISTIC_*.png"
  );
}