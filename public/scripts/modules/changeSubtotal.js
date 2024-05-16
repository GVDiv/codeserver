import products from "../data/products.js";

export default async function changeSubtotal(event, id) {
  let product = await fetch("/api/products");
  product = await product.json();
  product = product.response;
  console.log(product)
  const value = event.target.value;
  const found = product.find((each) => each.id === id);
  console.log(found)
  const subtotal = found.price * value;
  const priceSelector = document.querySelector("#price");
  priceSelector.innerHTML = "$" + subtotal;
}