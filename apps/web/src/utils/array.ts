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

export const areArraysEqual = <T>(left: T[], right: T[]) => {
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false;
  }
  return true;
};
