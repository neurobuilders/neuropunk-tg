export const formatNumber = (num: number, minimumFractionDigits = 3) => {
  return num
    .toLocaleString("en", {
      minimumFractionDigits,
      maximumFractionDigits: 3,
      useGrouping: true,
    })
    .replace(/,/g, " ");
};
