const modules = import.meta.glob(
  "../dummyData/InfoStats/INFOSTATISTIC_*.png",
  { eager: true, as: "url" }
);

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