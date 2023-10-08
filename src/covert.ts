export const convertNumber = (number: number) =>
  number.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
