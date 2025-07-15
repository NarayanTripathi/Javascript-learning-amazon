import { calculateCartQuantity } from "../../data/cart";

export function renderCheckoutHeader () {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-payment-summary-row").innerHTML = `
    <div>Items (${cartQuantity}):</div>
    `
}