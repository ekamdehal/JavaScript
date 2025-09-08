export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export function getShippingCost(deliveryOptionId) {
  if (deliveryOptionId === '1') {
    return 0;
  }
  if (deliveryOptionId === '2') {
    return 499;
  }
  if (deliveryOptionId === '3') {
    return 1299;
  }
}

export default formatCurrency;