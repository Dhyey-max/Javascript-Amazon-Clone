import { products, loadProductsFetch, findProduct } from "../data/products.js";
import { orders,findOrder } from "../data/orders.js";
import dayJs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import "./utils/percentageProgress.js";
import { calculatePercentageProgress } from "./utils/percentageProgress.js";

loadProductsFetch().then(() => {
  renderTracking();
});

function renderTracking() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  const order = findOrder(orderId);
  const orderTime = dayJs(order.orderTime).format('dddd, MMMM DD');
  const product = findProduct(productId);
  const timeOfOrder = order.orderTime;
  let matchingProduct;

  order.products.forEach((producting) => {
    if(producting.productId === product.id) {
      matchingProduct = producting;
    }
  });
  console.log(timeOfOrder);
  const arrivingTime = matchingProduct.estimatedDeliveryTime;

  const percentageProgres = calculatePercentageProgress(timeOfOrder,arrivingTime);
  let progress;

  if(percentageProgres < 0.49) {
    progress = 'preparing';
  } else if (0.49 < percentageProgres < 0.99) {
    progress = 'shipped';
  } else if (percentageProgres > 0.99){
    progress = 'Delivered';
  }
  console.log(percentageProgres);
  const percentage = Math.round(percentageProgres*100);
  console.log(percentage);

  document.querySelector('.js-order-tracking').innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${orderTime}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingProduct.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
    `;
    document.querySelector('.js-progress-bar').setAttribute("style",`width:${percentage}%;`);
    console.log(percentage);
}