import { cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

hello();

// Quick test of dayjs
const today = dayjs();
console.log(today.format('dddd, MMMM D'));

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Find matching product
  const matchingProduct = products.find((product) => product.id === productId);

  // Find matching delivery option
  const deliveryOption = deliveryOptions.find(
    (option) => option.id === cartItem.deliveryOptionId
  );

  // Compute delivery date string
  const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container" data-product-id="${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link">
              Update
            </span>
            <input class="quantity-input">
            <span class="save-quantity-link link-primary js-save-link">
              Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link">
              Delete
            </span>
          </div>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  `;
});

// Generate delivery options HTML for a product
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString =
      deliveryOption.priceCents === 0
        ? `FREE`
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `;
  });

  return html;
}

// Render cart summary
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Delete handlers
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = link.closest('.js-cart-item-container');
    const productId = container.dataset.productId;

    removeFromCart(productId);
    container.remove();
    updateCheckoutQuantity();
  });
});

// Update checkout header
function updateCheckoutQuantity() {
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

// Handle update clicks
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = link.closest('.js-cart-item-container');
    container.classList.add('is-editing-quantity');
  });
});

// Handle save clicks
document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = link.closest('.js-cart-item-container');
    const productId = container.dataset.productId;

    container.classList.remove('is-editing-quantity');

    const quantityInput = container.querySelector('.quantity-input');
    const newQuantity = Number(quantityInput.value);

    let valid = true;

    if (newQuantity === 0) {
      removeFromCart(productId);
      container.remove();
      updateCheckoutQuantity();
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
  });
});

updateCheckoutQuantity();
