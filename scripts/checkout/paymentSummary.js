import { cart, calculateCartQuantity, loadCart } from "../../data/cart.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOpt.js";
import { addOrder, orders } from "../../data/orders.js";

export function paymentSummary() {
  loadCart();
  document.querySelector('.js-cart-item').innerHTML = `Items (${calculateCartQuantity()})`;
  let itemCost = 0;
  cart.forEach((item) => {
    const quantity = item.quantity;
    const product = findProduct(item.productId);
    const price = product.priceCents;
    const cost = quantity * price;

    itemCost += cost;
  });

  document.querySelector('.js-payment-summary-money').innerHTML = `$${formatCurrency(itemCost)}`;

  let shippingCost = 0;
  cart.forEach((item) => {
    const deliveryId = item.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryId);
    const cost = deliveryOption.priceCents;

    shippingCost += cost
  });

  document.querySelector('.js-shipping-cost').innerHTML = `$${formatCurrency(shippingCost)}`;

  let totalBeforeTax = shippingCost + itemCost;

  document.querySelector('.js-total-before-tax').innerHTML = `$${formatCurrency(totalBeforeTax)}`;

  let tax = Math.round(totalBeforeTax / 10);

  document.querySelector('.js-tax-money').innerHTML = `$${formatCurrency(tax)}`;

  let total = tax + totalBeforeTax;

  document.querySelector('.js-order-total').innerHTML = `$${formatCurrency(total)}`;
  
  if(cart.length > 0) {
    document.querySelector('.js-place-order').addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const orderResponse = await response.json();
        addOrder(orderResponse);
        console.log(orders);

        window.location.href = 'orders.html';
      } catch (error) {
        console.log('Unexpected Error');
      }

    });
  } 
}