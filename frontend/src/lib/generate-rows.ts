export const generateRows = (count: number) => {
  return Array.from({ length: count }, (_, i) => String.fromCharCode(65 + i));
};
