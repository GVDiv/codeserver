export default function createProductCard(product) {
    return `
      <a class="product-card" href="../../pages/details.html?id=${product._id}">
        <img class="product-img" src="${product.photo}" alt="${product._id}">
        <div class="product-info">
          <span class="product-title">${product.title}</span>
        </div>
      </a>
    `;
  }
  /**
   * <div class="product-price-block">
            <span class="product-price">$${product.price}</span>
            <span class="product-discount">50% Off</span>
          </div>
          <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
   */
