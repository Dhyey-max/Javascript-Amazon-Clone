import { orders } from '../data/orders.js';
import dayJs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from './utils/money.js';
import {products,loadProductsFetch,findProduct} from '../data/products.js';
import {cart,calculateCartQuantity,addToCart} from "../data/cart.js"

loadProductsFetch().then(() => {
  renderOrder();
});

  function renderOrder() {
    let ordersHtml = '';
    let orderCartHtml = '';
    console.log(orders);
    orders.forEach((order) => {
      const orderId = order.id;
      const orderTime = order.orderTime;
      const timeOfOrder = dayJs(orderTime).format('MMMM DD');
      const totalPrice = formatCurrency(order.totalCostCents);
      const orderArray = order.products;
      
      orderArray.forEach((product) => {
        const productId = product.productId;
        const orderProduct = findProduct(productId);
        const arrivingTime = dayJs(product.estimatedDeliveryTime).format('MMMM DD');

        orderCartHtml += `
        
          <div class="product-image-container">
          <img src="${orderProduct.image}">
          </div>

        <div class="product-details js-product-details">
          <div class="product-name">
            ${orderProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${arrivingTime}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
          data-product-id="${productId}"
          data-product-quantity="${product.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?productId=${productId}&orderId=${orderId}">
            <button class="track-package-button button-secondary js-track-package-button"
            data-product-id="${productId}"
            data-order-id="${orderId}">
              Track package
            </button>
          </a>
        </div>
        
        `;
      
      });

      ordersHtml += `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${timeOfOrder}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalPrice}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>
        

          <div class="order-details-grid js-order-details-grid">
            ${orderCartHtml}
          </div>
        </div>
      `;

      orderCartHtml = '';
    });

    document.querySelector('.js-order-grid').innerHTML = ordersHtml;
    localStorage.removeItem('cart');
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

    document.querySelectorAll('.js-buy-again-button').forEach((item) => {
      item.addEventListener('click', () => {
        const productId = item.dataset.productId;
        const productQuantity = Number(item.dataset.productQuantity);
        console.log(productId);

        addToCart(productId,productQuantity);
        document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
      });
    });
  }




