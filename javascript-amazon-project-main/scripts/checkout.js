import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct, getProductPrice} from '../../data/products.js';
import {formatCurrency, getShippingCost} from './utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

console.log('checkout.js');

renderOrderSummary();
renderPaymentSummary();

function renderPaymentSummary() {

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
            <div class="payment-summary-money">$${formatCurrency(getShippingCost(cart[0].deliveryOptionId))}</div>
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
            <div class="payment-summary-money">$${formatCurrency(itemsTotalCents + 400 + (itemsTotalCents * 0.1))}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div> `;
  document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;
}

function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);

  // generate the dates 
  const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
  const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');

  const deliveryDate1 = dayjs().add(7, 'days');
  const deliveryDate2 = dayjs().add(3, 'days');
  const deliveryDate3 = dayjs().add(1, 'days');

  // generate the HTML for the cart summary

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate.format('dddd, MMMM D')}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${productId}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio"  ${cartItem.deliveryOptionId === '1' ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="1"
            >
          <div>
            <div class="delivery-option-date">${deliveryDate1.format('dddd, MMMM D')}</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>

        <div class="delivery-option">
          <input type="radio"  ${cartItem.deliveryOptionId === '2' ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="2"
            >
          <div>
            <div class="delivery-option-date">${deliveryDate2.format('dddd, MMMM D')}</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>

        <div class="delivery-option">
          <input type="radio"  ${cartItem.deliveryOptionId === '3' ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="3"
            >
          <div>
            <div class="delivery-option-date">${deliveryDate3.format('dddd, MMMM D')}</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  `;
  });

  // Render the order summary
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Update the checkout quantity
  updateCheckoutQuantity();

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCheckoutQuantity();
      renderPaymentSummary();
    });
  });

  function updateCheckoutQuantity() {
    // Update the checkout quantity display
    let checkoutQuantity = 0;

    cart.forEach((item) => {
      checkoutQuantity += item.quantity;
    });

    if (checkoutQuantity === 0) {
      document.querySelector('.js-checkout-header-middle-section').innerHTML =
        'Checkout (<a class="return-to-home-link" href="amazon.html">...</a>)';
    } else {
      document.querySelector('.js-checkout-header-middle-section').innerHTML = `
        Checkout (<a class="return-to-home-link" href="amazon.html">${checkoutQuantity} items</a>)
      `;
    }
  }

  // handles quantity updates
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity');
    });
  });

  // handles quantity saves
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityInput = container.querySelector('.quantity-input');
      const newQuantity = Number(quantityInput.value);

      let valid = true; 

      if (newQuantity === 0) {
        removeFromCart(productId);
        container.remove();
        return; 
      }

      if (newQuantity < 0 || newQuantity > 1000 || isNaN(newQuantity)) {
        valid = false;
        container.classList.add('has-error');
        container.classList.add('is-editing-quantity');
      }

      if (valid) {
        updateQuantity(productId, newQuantity);
        container.querySelector('.quantity-label').textContent = newQuantity;
        updateCheckoutQuantity();
      }
      renderPaymentSummary();
    });
  });

  // handles changes in the delivery options
  document.querySelectorAll('.delivery-option-input').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
