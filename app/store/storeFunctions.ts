/**
 * Compares two arrays to check if they contain the same elements
 * with the same frequencies, regardless of order.
 * * Works best with primitive types (string, number, boolean).
 * * @param arr1 First array
 * @param arr2 Second array
 * @returns true if identical irrespective of order
 */
export function areArraysIdentical<T>(arr1: T[], arr2: T[]): boolean {
  // 1. Quick check: If lengths are different, they cannot be identical
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 2. Use a Frequency Map (Counter) approach
  // This is O(N) and generally faster/safer than sorting for mixed types
  const frequencyMap = new Map<T, number>();

  // Count occurrences in first array
  for (const item of arr1) {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
  }

  // Decrement counts based on second array
  for (const item of arr2) {
    const count = frequencyMap.get(item);

    // If item doesn't exist or count reaches 0, match failed
    if (count === undefined || count === 0) {
      return false;
    }

    frequencyMap.set(item, count - 1);
  }

  return true;
}

/**
 * Removes all instances of a specific string from an array of strings.
 * returns a new array without modifying the original.
 * * @param arr The source array of strings
 * @param target The string to remove (e.g., "Any")
 * @returns A new array with the target string removed
 */
export function removeStringFromArray(arr: string[], target: string = "Any"): string[] {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.filter(item => item !== target);
}

