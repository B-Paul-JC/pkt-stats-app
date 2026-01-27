export interface Hall {
  id: number;
  name: string;
  gender: "Female" | "Male";
}

// Complete Database derived from the provided Hall List
export const HALLS: Hall[] = [
  { id: 1, name: "Queen Elizabeth Hall", gender: "Female" },
  { id: 2, name: "Mellanby Hall", gender: "Male" },
  { id: 3, name: "Lord Tedder Hall", gender: "Male" },
  { id: 4, name: "Ransome Kuti Hall", gender: "Male" },
  { id: 5, name: "Sultan Bello Hall", gender: "Male" },
  { id: 6, name: "Nnamdi Azikwe Hall", gender: "Male" },
  { id: 7, name: "Independence Hall", gender: "Male" },
  { id: 8, name: "Queen Idia Hall", gender: "Female" },
  { id: 9, name: "Obafemi Awolowo Hall", gender: "Female" },
];

/**
 * Maps a Hall ID to the full Hall object.
 * Usage: const hall = getHall(1); // { id: 1, name: "Queen Elizabeth Hall" }
 */
export const getHall = (id: number | string): Hall | undefined => {
  const numericId = Number(id);
  return HALLS.find((h) => h.id === numericId);
};

/**
 * Maps a Hall Name (case-insensitive) to its ID.
 * Usage: const id = getHallId("Mellanby Hall"); // 2
 */
export const getHallId = (name: string): number | undefined => {
  const normalized = name.toLowerCase().trim();
  const hall = HALLS.find((h) => h.name.toLowerCase() === normalized);
  return hall?.id;
};

/**
 * Unified resolver: Accepts ID or Name and returns the full Hall object.
 * Useful for search bars or flexible inputs.
 */
export const resolveHall = (query: number | string): Hall | undefined => {
  if (typeof query === "number" || (!isNaN(Number(query)) && query !== "")) {
    return getHall(query);
  }
  if (typeof query === "string") {
    // Check if it matches a Name
    const byName = HALLS.find(
      (h) => h.name.toLowerCase() === query.toLowerCase().trim(),
    );
    if (byName) return byName;
  }
  return undefined;
};

/**
 * Helper to get a display string "Name"
 */
export const getHallLabel = (id: number): string => {
  const hall = getHall(id);
  return hall ? hall.name : `Unknown Hall (${id})`;
};
