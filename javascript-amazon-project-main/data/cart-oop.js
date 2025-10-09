import { getShippingCostForDeliveryOption } from "./deliveryOptions";

const cart = {
  cartItems: undefined,

loadFromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem('cart'));

  if (!this.cartItems) {
    // fill  the cart with parsed items after clearing it
    this.cartItems = [{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId : '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
},


// Adds a product to the cart
addToCart(productId, selectedQuantity) {
  let matchingItem;

  this.cartItems.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    this.cartItems.push({
      productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }
  this.saveToStorage();
},

saveToStorage() {
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},

// removes a product from the cart
removeFromCart(productId) {
  const index = this.cartItems.findIndex(item => item.productId === productId);
  if (index !== -1) {
    this.cartItems.splice(index, 1); // mutates the existing array
  }
  this.saveToStorage();
},

updateQuantity(productId, newQuantity) {
  const item = this.cartItems.find(item => item.productId === productId);
  if (item) {
    item.quantity = newQuantity;
  }
  this.saveToStorage();
},

updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  this.saveToStorage();
},

getShippingCost() {
  let totalShippingCost = 0;

  this.cartItems.forEach((item) => {
    totalShippingCost += getShippingCostForDeliveryOption(item.deliveryOptionId);
  });

  return totalShippingCost;
}
};
