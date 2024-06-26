import printProductCards from "./printProductCards.js";

export default async function fetchProducts(id, filter) {
  try {
    const query = location.search;
    const params = new URLSearchParams(query);
    const page = params.get("page");
    //console.log(page);
    let res = await fetch(
      `/api/products/paginate?title=${filter}&page=${page || 1}`
    );
    res = await res.json();
    console.log(res);
    const prev = document.querySelector("#prev");
    res.info.prevPage &&
      (prev.innerHTML = `<a class="page-button" href='../../index.html?page=${res.info.prevPage}'>
      <i class="fa-solid fa-caret-left"></i>
      prev
      </a>`);
    const next = document.querySelector("#next");
    res.info.nextPage &&
      (next.innerHTML = `<a class="page-button" href='../../index.html?page=${res.info.nextPage}'>
      next
      <i class="fa-solid fa-caret-right"></i></a>`);
    printProductCards(res.response, id);
  } catch (error) {
    console.log(error);
  }
}
