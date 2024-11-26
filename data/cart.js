export let cart;

export function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId,selected) {
    
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        } 
    });
  
    if(matchingItem) {
        matchingItem.quantity += selected;
    } else {
        cart.push({
            productId: productId,
            
            quantity: selected,
            deliveryOptionsId: '2'
        });
    }

    saveToStorage();
  }

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((item) => {
        if(item.productId !== productId && item.quantity !== 0) {
            newCart.push(item);
        }

    });

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity() {
    loadCart();
    let cartQuantity = 0;
    cart.forEach((product) => {
      cartQuantity += product.quantity;
    });
    
    return cartQuantity;
}

export function updateQuantity(productId,quantity) {
    let matchingItem;

    cart.forEach((item) => {
        if(productId === item.productId) {
            matchingItem = item
        }
    });

    matchingItem.quantity = quantity;
    saveToStorage();
}

export function updateDeliveryOptionId(productId,deliveryId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        } 
    });

    matchingItem.deliveryOptionsId = deliveryId;

    saveToStorage();
}

export async function loadCartBackend() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
}