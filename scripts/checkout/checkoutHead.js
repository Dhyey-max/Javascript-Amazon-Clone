import { calculateCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader() {
  document.querySelector('.js-checkout-link').innerHTML = `${calculateCartQuantity()} Items`;
}