import products from "../data/products.js";

export default async function changeSubtotal(event, id) {
  let res = await fetch("/api/products")
  console.log(res)
  const value = event.target.value;
  const found = products.find((each) => each.id === id);
  console.log(found)
  const subtotal = found.price * value;
  const priceSelector = document.querySelector("#price");
  priceSelector.innerHTML = "$" + subtotal;
}