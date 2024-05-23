import { hideSearch, printIcons } from "./modules/printLayout.js";
import fetchOptions from "./modules/fetchOptions.js";

hideSearch();
printIcons();
fetchOptions();

let response = await fetch("/api/sessions/online");
    response = await response.json();
let data = response;
    console.log(data);
    document.querySelector("#profile-details").innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <img src="${data.photo}" class="img-profile" alt="...">
        <p class="info-text">user: ${data.email}</p>
        <p class="info-text">role: ${data.role}</p>
      </div>
    </div>
    `
