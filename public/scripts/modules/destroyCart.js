import printCartCards from "./printCartCards.js";
import printCartTotal from "./printCartTotal.js";

export default async function destroyCart() {
    try {
      const response = await fetch("/api/carts");
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const cartData = await response.json();
      const productsCart = cartData.response;
  
      await Promise.all(
        productsCart.map(async (product) => {
          const url = "/api/carts/" + product._id;
          const opts = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
          const deleteResponse = await fetch(url, opts);
          if (!deleteResponse.ok) {
            throw new Error(`Failed to delete product with id ${product._id}`);
          }
        })
      );
  
      // Vaciar el carrito en el frontend
      const cartProducts = [];
      localStorage.setItem("cart", JSON.stringify(cartProducts));
  
      // Actualizar la vista del carrito
      printCartCards(cartProducts, "productscart");
      printCartTotal(cartProducts, "total");
  
      Swal.fire({
        title: "¡Gracias por su compra!",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#ff3b3c",
      });
  
    } catch (error) {
      console.error("Error eliminando productos del carrito:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error al vaciar el carrito",
        confirmButtonColor: "#ff3b3c",
      });
    }
  }
  