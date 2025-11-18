// Define a type for the structure of a single data record.

import type { k_type } from "~/store/useAppStore";

// This is the source data shape.
export interface DataRecord {
  [key: string]: string | number;
}

// Define the shape of the aggregated output object.
// The key (TKey) will be the value of the grouping field (e.g., "Agriculture")
// and the value will be the total sum (number).
export interface AggregatedResult {
  [groupName: string]: number;
}

/**
 * Transforms an array of objects into a single-element array by automatically
 * determining the grouping key (the sole non-numeric/string field) and summing
 * all other numeric fields.
 *
 * @param {DataRecord[]} data The input array of objects.
 * @returns {AggregatedResult[]} A single-element array with the aggregated totals.
 */
export function aggregateAllNumericFields(
  data: DataRecord[],
  criteria: k_type
): AggregatedResult[] {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Input data must be a non-empty array.");
    return [{}];
  }

  // Helper to check if a value can be reliably treated as a number
  const isNumeric = (value: string | number): boolean =>
    typeof value === "number" ||
    (!isNaN(parseFloat(value as string)) &&
      isFinite(value as unknown as number));

  // --- 1. Automatic Key Identification using the first object ---
  let groupKey: string | null = null;
  const valueKeys: string[] = [];
  const firstItem = data[0];

  for (const key in firstItem) {
    if (Object.prototype.hasOwnProperty.call(firstItem, key)) {
      const value = firstItem[key];

      // Check for the non-numeric grouping key (the string field)
      if (typeof value === "string" && !isNumeric(value)) {
        if (!groupKey) {
          groupKey = key;
        } else {
          console.warn(
            `Multiple grouping keys detected. Using the first key found: '${groupKey}'.`
          );
        }
      }

      // Check for numeric keys to be summed
      else if (isNumeric(value)) {
        if (key.toUpperCase() === criteria.toUpperCase()) {
          valueKeys.push(key);
        }
      }
    }
  }

  if (!groupKey) {
    // console.error(
    //   "Error: Could not automatically determine the single string grouping key."
    // );
    return [{}];
  }

  // console.log(`\n- Identified Grouping Key: "${groupKey}"`);
  // console.log(`- Identified Summation Keys: ${JSON.stringify(valueKeys)}`);

  // --- 2. Aggregation ---
  const aggregatedTotals: AggregatedResult = data.reduce(
    (accumulator: AggregatedResult, record: DataRecord) => {
      const groupName = record[groupKey as string] as string;

      // Sum all identified numeric value keys for the current record
      const totalSum: number = valueKeys.reduce((sum: number, key: string) => {
        // Coerce value to number, defaulting to 0 if it's not a number or is missing
        const value = Number(record[key]) || 0;
        return sum + value;
      }, 0);

      accumulator[groupName] = totalSum;
      return accumulator;
    },
    {}
  );

  // Return the resulting object wrapped in a single-element array
  return [aggregatedTotals];
}
