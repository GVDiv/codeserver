import options from "./data/layoutOptions.js";
import { hideSearch, printNavBar, printFooter, printIcons } from "./modules/printLayout.js";
import printCartCards from "./modules/printCartCards.js";
import printCartTotal from "./modules/printCartTotal.js";

hideSearch();
printIcons();
printNavBar(options, "navbar");
printFooter(options, "footer");

async function initializeCart() {
  const cartproducts = await printCartCards("productscart");
  printCartTotal(cartproducts, "total");
}

initializeCart();


