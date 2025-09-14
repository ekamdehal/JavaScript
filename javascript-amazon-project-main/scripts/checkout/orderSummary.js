import {cart, removeFromCart, updateQuantity, updateDeliveryOption, getShippingCost} from '../../data/cart.js';
import {products, getProduct, getProductPrice} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutSummary} from './checkoutHeader.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);

    const deliveryDate = calculateDeliveryDate(cartItem.deliveryOptionId);
    const deliveryDate1 = calculateDeliveryDate('1');
    const deliveryDate2 = calculateDeliveryDate('2');
    const deliveryDate3 = calculateDeliveryDate('3');

  // generate the HTML for the cart summary

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate}
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
            <div class="delivery-option-date">${deliveryDate1}</div>
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
            <div class="delivery-option-date">${deliveryDate2}</div>
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
            <div class="delivery-option-date">${deliveryDate3}</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  `;
  });

  // Render the order summary
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderOrderSummary();
      renderCheckoutSummary();
      renderPaymentSummary();
    });
  });

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
    const input = container.querySelector('.quantity-input');

    const inputString = String(input.value).trim();
    const quantity = Number.parseInt(inputString, 10);

    if (inputString === '' || !Number.isInteger(quantity) || quantity < 0 || quantity > 1000) {
      container.classList.add('has-error', 'is-editing-quantity');
      return;
    }
    container.classList.remove('has-error', 'is-editing-quantity');

    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }

    // re-render
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutSummary();
  });
});


  // handles changes in the delivery options
  document.querySelectorAll('.delivery-option-input').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}