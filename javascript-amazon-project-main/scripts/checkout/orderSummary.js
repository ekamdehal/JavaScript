import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

renderOrderSummary(cart);

function renderOrderSummary(cart) {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

  // loop through products to find the matching product
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

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
    });
  });

  // handles changes in the delivery options
  document.querySelectorAll('.delivery-option-input').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(cart);
    });
  });
}
