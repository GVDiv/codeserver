export default function createCartCard(cid, product, quantity) {
    return `
      <article class="product-cart">
        <img class="product-img" src="${product.photo}" alt="${product.title}">
        <div class="product-details">
          <div class="cart-inputs">
            <input class="product-input" type="number" name="quantity" value=${quantity} min="1" id="change-${cid}" onchange="changeQuantityCart(event)">
            <button type="button" id="${cid}" class="remove-btn" onclick="removeProduct">Quitar del Carrito</button>
          </div>
        </div>
        <strong class="price">AR$ ${product.price}</strong>
      </article>
    `;
  }