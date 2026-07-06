export function formatMoney(amount) {
  const isWhole = Math.round(amount * 100) % 100 === 0;
  return `Rs. ${amount.toLocaleString("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
