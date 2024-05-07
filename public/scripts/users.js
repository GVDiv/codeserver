const template = (data) => `
<div class="product-card " style="width: 18rem;">
  <img src="${data.photo}" class="product-img" alt="...">
  <div class="product-price-block">
    <p class="product-price">${data.email}</p>
    <div>
      <a href="../profile.html?id=${data._id}" class="btn btn-primary">detail</a>
    </div>
  </div>
</div>
`;

fetch("/api/users")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const users = res.response
    document.querySelector("#users").innerHTML = users.map(each=>template(each)).join("")
  })
  .catch((err) => console.log(err));