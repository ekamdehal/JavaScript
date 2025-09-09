import {cart, removeFromCart, updateQuantity, updateDeliveryOption, getShippingCost} from '../../data/cart.js';
import {products, getProduct, getProductPrice} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderPaymentSummary() {

  // I am reusing this bit of code, it could be made better
  let checkoutQuantity = 0;
  cart.forEach((item) => {
    checkoutQuantity += item.quantity;
  });
  
  let itemsTotalCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let price = getProductPrice(productId);
    itemsTotalCents += price * cartItem.quantity;
  });

  let PaymentSummaryHTML = `
          <div class="payment-summary js-payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${checkoutQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(getShippingCost(cart))}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(itemsTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsTotalCents * 0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(itemsTotalCents + getShippingCost(cart) + (itemsTotalCents * 0.1))}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div> `;
  document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;
}
