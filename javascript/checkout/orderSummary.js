import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryDate
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { handleCurrency } from "../../utils/handleCurrency.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import isSatSun from "../../utils/isWeekend.js";


export function renderOrderSummary() {


  updateCartQuantity();
  let cartSummaryHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    
    let matchingProduct = getProduct(productId);

    let deliveryOptionId = cartItem.deliveryOptionId;
    
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D')

    cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
          <div class="delivery-date">
              Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
              <img class="product-image"
              src="${matchingProduct.image}">

              <div class="cart-item-details">
              <div class="product-name">
                  ${matchingProduct.name}
              </div>
              <div class="product-price">
                  $${handleCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                  <span>
                  Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id = "${
                    matchingProduct.id
                  }">
                  Update
                  </span>
                  <input class="quantity-input js-quantity-input-${
                    matchingProduct.id
                  }">
                  <span class="save-quantity-link link-primary" data-product-id = "${
                    matchingProduct.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
                    matchingProduct.id
                  }">
                  Delete
                  </span>
              </div>
              </div>

              <div class="delivery-options">
                  <div class="delivery-options-title">
                      Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
      </div>
      `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';

      deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D')

      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${handleCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      // console.log("id: ", matchingProduct.id);
      
      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}"
          >
              <input type="radio"
                  ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
              <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceString} Shipping
                  </div>
              </div>
          </div>
          `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }

  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      renderOrderSummary();
      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      const quantity = document.querySelector(
        `.js-quantity-input-${productId}`
      ).value;
      const newQuantity = Number(quantity);
      updateQuantity(productId, newQuantity);
      updateCartQuantity();

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;

      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryDate(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

renderOrderSummary();