// Utility functions for class combining and formatting
export function cn(...inputs) {
  return inputs
    .flat(Boolean)
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function formatRating(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.0";
  return val.toFixed(1);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
