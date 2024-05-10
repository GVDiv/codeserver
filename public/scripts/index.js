const template = (data) => `
<div class="card" style="width: 18rem;">
  <img src="${data.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <div 
        style="
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: flex-start;
      ">
      <h5 class="product-title">${data.title}</h5>
      <p class="product-price">$ ${data.price}</p>
    </div>
    <div style="
            width: 100%;
            display: flex;
            justify-content: space-between
    ">
      <a href="./pages/detailsProduct.html?id=${data._id}" class="btn btn-primary">
        <i class="fa-solid fa-circle-info"></i>
      </a>
      <button href="#" class="btn btn-primary" onclick="addToCart('${data._id}')">
        <i class="fa-solid fa-cart-plus"></i>
      </button>
    </div>
  </div>
</div>
`;

let currentPage = 1;
const pageSize = 10;
let totalPages = 1;

function loadProducts(page) {
  fetch(`/api/products/paginate?page=${page}&limit=${pageSize}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const products = res.response;
      document.querySelector("#products").innerHTML = products
        .map((each) => template(each))
        .join("");
      totalPages = res.info.totalPages; // Actualizamos el total de páginas
      console.log("Total de páginas:", totalPages);
      updatePaginationButtons();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      updatePaginationButtons();
    });
}

function loadPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadProducts(currentPage);
  }
}

function loadNextPage() {
  currentPage++;
  loadProducts(currentPage);
}

function updatePaginationButtons() {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Deshabilitar el botón "Prev" si estamos en la primera página
  prevButton.disabled = currentPage === 1;

  // Deshabilitar el botón "Next" si estamos en la última página
  nextButton.disabled = currentPage === totalPages;
}

document.getElementById("prev").addEventListener("click", loadPrevPage);
document.getElementById("next").addEventListener("click", loadNextPage);

loadProducts(currentPage);

async function addToCart(pid) {
  try {
    const data = {
      user_id: "6623ec94d8ef27548f40e5a3",
      product_id: pid,
      quantity: 1,
    };
    const url = "api/carts";
    const opts = {
      method: "POST",
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
