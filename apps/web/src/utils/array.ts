export const orderBy = <T>(
  arr: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
) => {
  return arr.sort((a, b) => {
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    return 0;
  });
};
