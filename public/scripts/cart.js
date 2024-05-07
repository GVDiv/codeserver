const template = (data) => `
<div class="product-card " style="width: 18rem;">
  <img src="${data.product_id.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <h5 class="product-title">title: ${data.product_id.title}</h5>
    <p class="product-price">price: $${data.product_id.price}
    </p>
    <p type="number" class="product-price"> quantity: ${data.quantity}</p>
    <div class="input-group mb-3">
      <button class="btn btn-outline-secondary" type="button" id="button-addon1">update</button>
      <input type="text" class="form-control" placeholder="${data.quantity}" aria-label="" aria-describedby="button-addon1" onclick="update('${data._id}')">
    </div>
    <div>
      <button class="btn btn-primary" onclick="destroy('${data._id}')">remove</button>
    </div>
  </div>
</div>
`;

fetch("/api/carts?user_id=6623ec94d8ef27548f40e5a3")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const products = res.response;
    document.querySelector("#productsOnCart").innerHTML = products
      .map((each) => template(each))
      .join("");

      fetch("/api/users/6623ec94d8ef27548f40e5a3")
        .then((res) => res.json())
        .then((userData) => {
          const user = userData.response;
          console.log(user)
          const productsCount = products.length;
          console.log(productsCount)
          document.querySelector("#userCart").innerHTML = `
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Info</h5>
              <p class="card-text">user: ${user.email}</p>
              <p class="card-text">total products: ${productsCount}</p>
              <a href="#" class="btn btn-primary">pay</a>
            </div>
          </div>
          `;
        });
  })
  .catch((err) => console.log(err));



async function destroy(pid) {
  try {
    const url = "/api/carts/" + pid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    location.reload();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
