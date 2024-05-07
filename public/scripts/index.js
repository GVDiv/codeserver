const template = (data) => `
<div class="product-card " style="width: 18rem;">
  <img src="${data.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <h5 class="product-title">${data.title}</h5>
    <p class="product-price">$
    ${data.price}
    </p>
  </div>
</div>
`


fetch("/api/products")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const products = res.response
    document.querySelector("#products").innerHTML = products.map(each=>template(each)).join("")
  })
  .catch((err) => console.log(err));
