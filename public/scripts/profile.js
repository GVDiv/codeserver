fetch("/api/users/6623ec94d8ef27548f40e5a3")
  .then((res) => res.json())
  .then((userData) => {
    const user = userData.response;
    console.log(user);
    document.querySelector("#profile").innerHTML = `
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
