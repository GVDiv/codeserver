import { hideSearch, printIcons } from "./modules/printLayout.js";
import fetchOptions from "./modules/fetchOptions.js";
import fetchOnSale from "./modules/fetchOnSale.js";

hideSearch();
printIcons();
fetchOptions();
fetchOnSale();

const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

  fetch("/api/sessions")
   .then((res) => res.json())
   .then((userOnline) => {
       const userOn = userOnline.response;
       console.log(userOn)
   })

fetch("/api/sessions")
  .then((res) => res.json())
  .then((userData) => {
    const user = userData.response;
    console.log(user);
    document.querySelector("#profile-details").innerHTML = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <img src="${user.photo}" class="img-profile" alt="...">
      <p class="info-text">user: ${user.email}</p>
      <p class="info-text">role: ${user.role}</p>
    </div>
  </div>
  `;
  })
  .catch((err) => console.log(err));
