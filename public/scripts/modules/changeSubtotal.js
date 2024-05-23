export default function changeSubtotal(event, product) {
  const value = parseFloat(event.target.value);
  
  if (isNaN(value) || value <= 0) {
    console.error("Invalid quantity:", value);
    return;
  }
  
  const subtotal = product.price * value;
  const priceSelector = document.querySelector("#price");
  priceSelector.innerHTML = "$" + subtotal.toFixed(2);
}
