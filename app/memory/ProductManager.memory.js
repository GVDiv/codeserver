class ProductManager {
    static #products = [];
  
    create(data) {
      const user = {
        id:
          ProductManager.#products.length == 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(user);
      console.log("producto creado");
    }
  
    read() {
      return ProductManager.#products;
    }
  }
  
  const gestorDeProductos = new ProductManager();
  gestorDeProductos.create({
    title: "zapatilla",
    photo: "picture.png",
    category: "calzado",
    price: 100,
    stock: 20,
  });
  
  gestorDeProductos.create({
    title: "gorra",
    photo: "picture.png",
    category: "accesorio",
    price: 80,
    stock: 30,
  })

  gestorDeProductos.create({
    title: "remera",
    photo: "picture.png",
    category: "prenda",
    price: 90,
    stock: 100,
  })

  gestorDeProductos.create({
    title: "pantalon",
    photo: "picture.png",
    category: "prenda",
    price: 120,
    stock: 100,
  })

  gestorDeProductos.create({
    title: "campera",
    photo: "picture.png",
    category: "prenda",
    price: 180,
    stock: 80,
  })
  
  console.log(gestorDeProductos.read());