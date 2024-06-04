import printCartTotal from "./printCartTotal.js";

export default function changeQuantityCart(event, arrayOfProducts) {
  const productId = event.target.getAttribute('data-product-id');
  const newQuantity = parseInt(event.target.value, 10);

  if (isNaN(newQuantity) || newQuantity < 0) {
    console.error("Invalid quantity:", newQuantity);
    return;
  }

  let one = arrayOfProducts.find((each) => each._id === productId);
  if (!one) {
    console.error("Product not found:", productId);
    return;
  }

  one.quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(arrayOfProducts));
  printCartTotal(arrayOfProducts, "total");

  Swal.fire({
    text: "El total se ha actualizado!",
    position: "top-right",
    width: "300px",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}
