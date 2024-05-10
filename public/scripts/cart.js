const template = (data) => `
<div class="product-card " style="width: 18rem;">
  <img src="${data.product_id.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <h5 class="product-title">title: ${data.product_id.title}</h5>
    <p class="product-price">price: $${data.product_id.price}
    </p>
    <p type="number" class="product-price"> quantity: ${data.quantity}</p>
    <div class="input-group mb-3">
      <button class="btn btn-outline-secondary" onclick="updateQuantity('${data.product_id._id}')" type="button">
        <i class="fa-solid fa-plus"></i>
      </button>
      <input type="number" class="form-control" id="quantityInput" min="0" value="0" >
    </div>
    <div>
      <button class="btn btn-primary" onclick="destroy('${data._id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
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
        console.log(user);
        const productsCount = products.length;
        console.log(productsCount);
        document.querySelector("#userCart").innerHTML = `
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">total purchase</h5>
              <p class="card-text">user: ${user.email}</p>
              <p class="card-text">total products: ${productsCount}</p>
              <a href="#" class="btn btn-primary text_btn">
                pay <i class="fa-solid fa-cash-register"></i>
              </a>
              <button class="btn btn-primary text_btn" onclick="destroyCart()">
                delete <i class="fa-solid fa-trash"></i>
              </button>
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

async function destroyCart() {
  try {
    const response = await fetch("/api/carts?user_id=6623ec94d8ef27548f40e5a3");
    const cartData = await response.json();
    const productsCart = cartData.response;
    await Promise.all(
      productsCart.map(async (product) => {
        const url = "/api/carts/" + product._id;
        const opts = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        await fetch(url, opts);
      })
    );
    location.reload();
  } catch (error) {
    console.log("Error eliminando productos del carrito:", error);
  }
}

async function updateQuantity(product_id) {
  const input = document.getElementById("quantityInput");
  const newQuantity = parseInt(input.value) || 0;
  await updateCart(product_id, newQuantity);
}

async function updateCart(product_id, newQuantity) {
  try {
    const cartId = "66396a8c140eb76866a72897";
    const url = `/api/carts/${cartId}/products/${product_id}`;
    const data = { quantity: newQuantity };
    const opts = {
      method: "PUT",
      body: JSON.stringify(data),
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

fetch("/api/carts?user_id=6623ec94d8ef27548f40e5a3")
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    const cartElement = document.getElementById("cart");

    if (products.length > 0) {
      cartElement.classList.remove("cart-empty");
      cartElement.classList.add("cart-with-products");
    } else {
      cartElement.classList.remove("cart-with-products");
      cartElement.classList.add("cart-empty");
    }
    const totalProducts = products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    document.getElementById("cartTotal").textContent = `${totalProducts}`;
  })
  .catch((err) => console.log(err));
