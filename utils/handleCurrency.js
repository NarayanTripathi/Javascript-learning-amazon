export function handleCurrency (priceCents) {
    const price = (priceCents/100).toFixed(2);
    return price;
}