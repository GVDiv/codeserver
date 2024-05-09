const queries = new URL(location.href)
const uid = queries.searchParams.get("id")

fetch(`/api/products/${uid}`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        const product = res.response
        document.querySelector("#detailsProduct").innerHTML=
        `
        <div class="img_container">
          <img src="${product.photo}" class="img_info" alt="...">
        </div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <p class="info-text">title: ${product.title}</p>
                <p class="info-text">category: ${product.category_id.category}</p>
                <p class="info-text">price: $${product.price}</p>
                <p class="info-text">size: ${product.size_id.size}</p>
                <p class="info-text">description: ${product.size_id.description}</p>
                <p class="info-text">stock: ${product.stock}</p>
                <div class="info_detail">
                  <button href="#" class="btn btn-primary" onclick="addToCart('${product._id}')">
                    <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-primary" type="button">
                      <i class="fa-solid fa-plus"></i>
                  </button>
                 <input type="number" class="form-control" id="quantityInput" min="0" value="0" > 
                </div>
                      
            </div>
        </div>
        `
    })
    .catch((err) => console.log(err))

    async function addToCart(pid) {
        try {
          const product = {
            user_id: "6623ec94d8ef27548f40e5a3",
            product_id: pid,
            quantity: 1,
          };
          const url = "/api/carts";
          const opts = {
            method: "POST",
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch(url, opts);
          response = await response.json();
          console.log(response);
          location.reload()
        } catch (error) {
          console.log(error);
        }
      }

  //CART COUNTER
  fetch("/api/carts?user_id=6623ec94d8ef27548f40e5a3")
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    console.log(products);
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
