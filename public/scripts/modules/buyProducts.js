import printCartCards from "./printCartCards.js";
import printCartTotal from "./printCartTotal.js";
import destroyCart from "./destroyCart.js";

export default () => {
  Swal.fire({
    title: "¿Desea confirmar la compra?",
    showCancelButton: true,
    confirmButtonColor: "#ff3b3c",
    icon: "question",
    confirmButtonText: "Sí",
    cancelButtonText: "Todavía no",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await destroyCart();
        Swal.fire({
          title: "¡Gracias por su compra!",
          timer: 5000,
          timerProgressBar: true,
          confirmButtonColor: "#ff3b3c",
        }).then(() => {
          const cartproducts = [];
          localStorage.setItem("cart", JSON.stringify(cartproducts));
          printCartCards(cartproducts, "productscart");
          printCartTotal(cartproducts, "total");
          location.reload(); // Recargar la página después de actualizar el carrito
        });
      } catch (error) {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error al vaciar el carrito",
          confirmButtonColor: "#ff3b3c",
        });
      }
    }
  });
};
