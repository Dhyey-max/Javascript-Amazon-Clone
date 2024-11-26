import { renderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
import { loadCartBackend} from "../data/cart.js";
// import "../data/backend-practice.js";

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartBackend()
    ])
  
  } catch (error) {
    console.log('Unexpected error: please try again later');
  }
  paymentSummary();
  renderSummary();

}

loadPage();