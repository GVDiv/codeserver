import { hideSearch, printIcons } from "./modules/printLayout.js";
import fetchOptions from "./modules/fetchOptions.js";
import fetchOnSale from "./modules/fetchOnSale.js";
import printProfile from "./modules/printProfile.js";

hideSearch();
printIcons();
fetchOptions();
fetchOnSale();

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");
console.log(id)
printProfile(id)