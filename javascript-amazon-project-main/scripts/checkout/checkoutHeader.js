import {cart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function updateCheckoutQuantity() {
  // Update the checkout quantity display
  let checkoutQuantity = 0;

  cart.forEach((item) => {
    checkoutQuantity += item.quantity;
  });
  return checkoutQuantity;
}

export function renderCheckoutSummary() {
  const checkoutQuantity = updateCheckoutQuantity();

  if (checkoutQuantity === 0) {
  document.querySelector('.js-checkout-header-middle-section').innerHTML =
    'Checkout (<a class="return-to-home-link" href="amazon.html">...</a>)';
  } else {
  document.querySelector('.js-checkout-header-middle-section').innerHTML = `
    Checkout (<a class="return-to-home-link" href="amazon.html">${checkoutQuantity} items</a>)
  `;
  }
}

