const template = (data) => `
<div class="product-card " style="width: 18rem;">
  <img src="${data.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <h5 class="product-title">${data.title}</h5>
    <p class="product-price">$
    ${data.price}
    </p>
    <div>
      <a href="../detailsProduct.html?id=${data._id}" class="btn btn-primary">detail</a>
      <button href="#" class="btn btn-primary" onclick="addToCart('${data._id}')">add to cart</button>
    </div>
  </div>
</div>
`
let currentPage = 1;
const pageSize = 10;

function loadProducts(page){
  fetch("/api/products/paginate")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const products = res.response
    document.querySelector("#products").innerHTML = products.map(each=>template(each)).join("")
  })
  .catch((err) => console.log(err));
}

function loadPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadProducts(currentPage);
  }
}

function loadNextPage(){
  currentPage++;
  loadProducts(currentPage)
}

document.getElementById("prev").addEventListener("click", loadPrevPage);
document.getElementById("next").addEventListener("click", loadNextPage);

loadProducts(currentPage);

  async function addToCart(pid){
    try {
      const data = {
        user_id:"6623ec94d8ef27548f40e5a3",
        product_id:pid,
        quantity:1
      }
      const url = "api/carts"
      const opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
      }
      let response = await fetch(url,opts)
      response = await response.json()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
