const queries = new URL(location.href)
const uid = queries.searchParams.get("id")

fetch(`/api/products/${uid}`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        const product = res.response
        document.querySelector("#detailsProduct").innerHTML=
        `
        <div class="card" style="width: 18rem;">
            <img src="${product.photo}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${product.title}</p>
                <p class="card-text">${product.category_id.category}</p>
                <p class="card-text">${product.price}</p>
                <p class="card-text">${product.size_id.size}</p>
                <p class="card-text">${product.size_id.description}</p>
                <p class="card-text">${product.stock}</p>
                <button href="#" class="btn btn-primary" onclick="addToCart('${product._id}')">add to cart</button>
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
          const url = "api/carts";
          const opts = {
            method: "POST",
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch(url, opts);
          response = await response.json();
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }