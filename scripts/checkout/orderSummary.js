import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOptionId, loadCart } from '../../data/cart.js';
import { products, findProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOpt.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { paymentSummary } from './paymentSummary.js';
import { isWeekend } from '../utils/isWeekend.js';
import { renderCheckoutHeader } from './checkoutHead.js';

export function renderSummary() {
  loadCart();
  renderCheckoutHeader();
  let containerHtml = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = findProduct(productId);
    const optionId = cartItem.deliveryOptionsId;
    let added = 0;

    while (isWeekend(dayjs().add(getDeliveryOption(optionId).deliveryTime + added, 'days'))) {
      added++;
    }

    const today = dayjs().add(getDeliveryOption(optionId).deliveryTime + added, 'days');
    const dateString = today.format('dddd, MMMM D');
    containerHtml = containerHtml + `<div class="cart-item-container
              js-cart-item-container
              js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingItem.priceCents)}
                  </div>
                  <div class="product-quantity
                  js-product-quantity-${matchingItem.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                      data-product-id="${matchingItem.id}">
                      Update
                    </span>
                    <input class ="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link link-primary js-save-${matchingItem.id}"
                      data-product-id="${matchingItem.id}">
                      save
                    </span>
                    <span class="delete-quantity-link link-primary
                    js-delete-link" data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                    
                  </div>
                  <div class="error-msg js-error-${matchingItem.id}">
                    Invalid input
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(matchingItem, cartItem)}
                </div>
              </div>
            </div>`;
  });
  document.querySelector('.order-summary').innerHTML = containerHtml;
  

  document.querySelectorAll('.js-delete-link')
    .forEach((item) => {
      item.addEventListener('click', () => {
        const productId = item.dataset.productId;

        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        document.querySelector('.js-checkout-link').innerHTML = `${calculateCartQuantity()} Items`;

        paymentSummary();
      });
    });

  function deliveryOptionsHtml(matchingItem, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      let added = 0;

      while (isWeekend(dayjs().add(deliveryOption.deliveryTime + added, 'days'))) {
        added++;
      }

      const today = dayjs().add(deliveryOption.deliveryTime + added, 'days');
      const dateString = today.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id = "${matchingItem.id}"
        data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            class="delivery-option-input"
            ${isChecked ? 'checked' : ''}
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
      document.querySelector(`.js-error-${productId}`).innerHTML = 'Invalid input';
      document.querySelector(`.js-error-${productId}`).classList.remove('is-error');
    });
  });

  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

      const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      if (newQuantity > 0 && newQuantity < 100) {
        console.log(newQuantity);
        updateQuantity(productId, newQuantity);

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        document.querySelector('.js-checkout-link').innerHTML = `${calculateCartQuantity()} Items`;

        document.querySelector(`.js-quantity-input-${productId}`).value = '';
        paymentSummary();
        return;
      } if (newQuantity > 100) {
        document.querySelector(`.js-error-${productId}`).classList.add('is-error');
        document.querySelector(`.js-error-${productId}`).innerHTML = 'Out of limit';
        document.querySelector(`.js-quantity-input-${productId}`).value = '';

        setTimeout(() => {
          document.querySelector(`.js-error-${productId}`).classList.remove('is-error');
          document.querySelector(`.js-error-${productId}`).innerHTML = 'Invalid input';
        }, 3900);
        paymentSummary();
      } if (newQuantity === 0) {
        return;
      }
      else {
        document.querySelector(`.js-error-${productId}`).classList.add('is-error');
        console.log('error');
        document.querySelector(`.js-quantity-input-${productId}`).value = '';

        setTimeout(() => {
          document.querySelector(`.js-error-${productId}`).classList.remove('is-error');
          document.querySelector(`.js-error-${productId}`).innerHTML = 'Invalid input';
        }, 3900);
      }



    });
  });


  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptionId(productId, deliveryOptionId);
      
      renderSummary();
      paymentSummary();
    });
  });
}

