
export const formatPrice = (usdPrice) => {
  if (typeof usdPrice !== 'number') {
    usdPrice = parseFloat(usdPrice) || 0;
  }
  const inrPrice = usdPrice * 83;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrPrice);
};
