document.querySelector("#login").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch("/api/sessions/login", opts);
  response = await response.json();
  console.log(response);

  if (response.statusCode === 200) {
    location.replace("/");
  }
  return alert(response.message);
});
