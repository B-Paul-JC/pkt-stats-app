const modules = import.meta.glob(
  "../pocketStats/InfoStats/2023/*.png",
  { eager: true, as: "url" }
);

export const imagePages: string[] = Object.keys(modules)
  .sort((a, b) => {
    // Simple string comparison works here due to the zero-padded numbering
    return a.localeCompare(b);
  })
  .map((key) => modules[key] as string);

if (imagePages.length === 0) {
  console.error(
    "No images found! Check the glob path: ../pocketStats/InfoStats/2023/*.png"
  );
}