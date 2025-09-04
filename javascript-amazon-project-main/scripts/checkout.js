import { cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

console.log(cart);

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>

        <div class="delivery-option">
          <input type="radio"  ${cartItem.deliveryOptionId === '2' ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>

        <div class="delivery-option">
          <input type="radio"  ${cartItem.deliveryOptionId === '3' ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  `;

  console.log(cartItem.productId, cartItem.deliveryOptionId);
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// Delete handlers
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCheckoutQuantity();
  });
});

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
    const productId = link.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const quantityInput = container.querySelector('.quantity-input');
    const newQuantity = Number(quantityInput.value);

    let valid = true; // start assuming input is valid

    if (newQuantity === 0) {
      // remove the item from cart if new quantity is 0
      removeFromCart(productId);
      container.remove();
      updateCheckoutQuantity();
      return; // stop here
    }

    if (newQuantity < 0 || newQuantity > 1000 || isNaN(newQuantity)) {
      // out of bounds or not a number
      valid = false;
      container.classList.add('has-error');
      container.classList.add('is-editing-quantity');
    }

    if (valid) {
      // update cart + UI
      updateQuantity(productId, newQuantity);
      container.querySelector('.quantity-label').textContent = newQuantity;
      updateCheckoutQuantity();
    }
  });
});

updateCheckoutQuantity();
