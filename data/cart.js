export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [
    {
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1
    }
];
}

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let totalQuantity = 0;
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });

    return totalQuantity;
}

export function addToCart (productId) {
    const addedElement = document.querySelector(`.js-added-${productId}`);
    const quantityElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;
  const quant = Number(quantityElement);

    let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quant;
    } else {
      cart.push({
        productId: productId,
        quantity: quant,
      });
    }

    addedElement.classList.add("show-added-to-cart");

    // clearTimeout(timeoutId);
    const timeoutId = setTimeout(() => {
      addedElement.classList.remove("show-added-to-cart");
    }, 2000);

    saveToStorage();
}

export function removeFromCart (productId) {
  
  let newCart = [];

  cart.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        });
      }
  })
  cart = newCart;
  // console.log(cart);
  saveToStorage();
}


export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  })
  saveToStorage();
}