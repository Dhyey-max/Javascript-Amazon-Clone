import { addToCart, saveToStorage, calculateCartQuantity, loadCart, cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { products, loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
  renderProductList();
})

function renderProductList() {
  let url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  let filterProducts = products;
  if (search) {
    filterProducts = products.filter((product) => {
      const upperCase = product.name.toLocaleUpperCase();
      const lowerCase = product.name.toLocaleLowerCase();
      let isMatchingKeyword = false;
      
      product.keywords.forEach((keyword) => {
        const upperCase = keyword.toLocaleUpperCase();
        const lowerCase = keyword.toLocaleLowerCase();

        if(keyword === (search) || upperCase === (search) || lowerCase === (search)) {
          isMatchingKeyword = true;
        }
      })

      if (product.name.includes(search) || upperCase.includes(search) || lowerCase.includes(search)) {
        return true;
      }

      if (isMatchingKeyword) {
        return true;
      }
    });  
  }

  loadCart();
  let productsHTML = '';
  document.querySelector('.js-cart-quantity').innerHTML = `${calculateCartQuantity()}`;
  if(filterProducts.length !== 0) {
    filterProducts.forEach((product) => {
    productsHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src=${product.ratingUrl()}>
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.productPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extrainfoHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-adding-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary
      js-add-to-cart" data-product-id="${product.id}"
      data-product-name="${product.name}"
      data-product-img="${product.image}"
      data-product-price="${(product.priceCents / 100).toFixed(2)}">
        Add to Cart
      </button>
    </div>`
  });
  } else {
    document.querySelector('.main').innerHTML = `<p class ="search-error">No products matched your search.</p>`;
  }
  

  document.querySelector('.products-grid').innerHTML = productsHTML;

  function addedMsg(productId, addedTimeoutId) {
    const addedmsg = document.querySelector(`.js-adding-${productId}`);

    addedmsg.classList.add('added');


    if (addedTimeoutId) {
      clearTimeout(addedTimeoutId);

    }

    const adding = setTimeout(() => {
      addedmsg.classList.remove('added');
    }, 2000);

    addedTimeoutId = adding;
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let addedTimeoutId;
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const selectorQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
      const selected = Number(selectorQuantity.value);
      addToCart(productId, selected);

      document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

      addedMsg(productId, addedTimeoutId);

      saveToStorage();
    });

    document.querySelector('.js-search-button').addEventListener('click', async () => {
      console.log('click');
      let search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;  
    });

    document.querySelector('.js-search-bar').addEventListener('keydown', () => {
      if(event.key === 'Enter') {
        let search = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${search}`;
        document.querySelector('.js-search-bar').value = search;
      }
    });
  });
}