export type OrderDirection = "ASC" | "DESC";

export function sortBy<T, R extends string | number>(
  data: T[],
  getCompareAbleValue: (item: T) => R,
  direction: OrderDirection
): T[] {
  return data.sort((a, b) => {
    const valueA = getCompareAbleValue(a);
    const valueB = getCompareAbleValue(b);

    const comparisonResult = compareValues(valueA, valueB);

    return direction === "DESC" ? -comparisonResult : comparisonResult;
  });
}

function compareValues(
  valueA: string | number,
  valueB: string | number
): number {
  if (typeof valueA === "string" && typeof valueB === "string") {
    return valueA.localeCompare(valueB);
  }

  if (typeof valueA === "number" && typeof valueB === "number") {
    return valueA - valueB;
  }

  return 0;
}
