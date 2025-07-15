import { cart,calculateCartQuantity } from "../../data/cart.js";
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import { handleCurrency } from "../../utils/handleCurrency.js";
import { renderCheckoutHeader } from "./checkOutHeader.js";

export function renderPaymentSummary () {
    renderCheckoutHeader();
    let itemsPrice = 0;
    let deliveryPrice = 0;
    cart.forEach((item) => {
        let product = getProduct(item.productId);
        let deliveryOption  = getDeliveryOption(item.deliveryOptionId)
        itemsPrice += item.quantity * product.priceCents;
        
        deliveryPrice += deliveryOption.priceCents;
    })

    console.log("items price: ",itemsPrice);
    console.log("delivery price: ", deliveryPrice);

    let totalBeforeTax = itemsPrice + deliveryPrice;
    console.log("totalBeforeTax: ",totalBeforeTax);
    let tax = totalBeforeTax * 0.1;
    console.log("tax: ", tax);
    

    let totalPrice = totalBeforeTax + tax;
    console.log("totalPrice: ",totalPrice);
    let cartQuantity = calculateCartQuantity();
    let paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row js-payment-summary-row">
        <div class="payment-summary-money">$${handleCurrency(itemsPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${handleCurrency(deliveryPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${handleCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${handleCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${handleCurrency(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `

    // return paymentSummaryHTML;
    document.querySelector(".js-payment-summay").innerHTML = paymentSummaryHTML;
}

