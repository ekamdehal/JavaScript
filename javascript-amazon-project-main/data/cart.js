export let cart = [];

loadFromStorage();

export function loadFromStorage() {
  const cartJson = localStorage.getItem('cart');

  if (cartJson) {
    // fill  the cart with parsed items after clearing it
    cart.splice(0, cart.length, ...JSON.parse(cartJson));
  }
}


// Adds a product to the cart
export function addToCart(productId, selectedQuantity) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// removes a product from the cart
export function removeFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) {
    cart.splice(index, 1); // mutates the existing array
  }
  saveToStorage();
}


export function updateQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}


function getShippingCostForDeliveryOption(deliveryOptionId) {
  let shippingCost = 0;

  if (deliveryOptionId === '1') { 
    shippingCost = 0;
  } else if (deliveryOptionId === '2') {
    shippingCost = 499;
  } else if (deliveryOptionId === '3') {
    shippingCost = 999;
  }

  return shippingCost;
}

export function getShippingCost(cart) {
  let totalShippingCost = 0;

  cart.forEach((item) => {
    totalShippingCost += getShippingCostForDeliveryOption(item.deliveryOptionId);
  });

  return totalShippingCost;
}
