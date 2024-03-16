const crypto = require("crypto");
const { on } = require("events");
class ProductManager {
  static #products = [];

  create(data) {
    try {
      if (!data) {
        const error = new Error("ingrese producto");
        throw error;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(product);
        console.log("producto creado");
      }
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      let allProducts = ProductManager.#products
      if(!allProducts){
        const error = new Error("no hay productos")
        console.log(error)
      } else {
        console.log("productos")
        return allProducts;
      }
    } catch (error) {
      throw error;
    }
  }
  //EL ID ESTA CON CRYPRO AL REINICIAR EL PROGRAMA ESTOS CAMBIAN SU VALOR
  //PARA PROBARLO CORRECTAMENTE LOS METODOS READONE Y DESTROY TIENEN QUE BUSCAR POR OTRA CARACTERISTICA TITLE, PRICE, STOCK ETC
  readOne(id) {
    try {
      let allProducts = ProductManager.#products
      let one = allProducts.find((each) => each.id === id); 
      if(!one){
        const error = new Error("producto no encontrado")
        console.log(error)
      } else {
        return one
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id){
    try {
      let allProducts = ProductManager.#products
      let one = allProducts.find(each => each.id === id)
      if(!one){
        throw new Error("producto no encontrado")
      } else {
        let filtered = allProducts.filter(each => each.id !== id)
        console.log(`producto ${one.title} eliminado`);
        return one
      }
    } catch (error) {
      throw error
    }
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
});

gestorDeProductos.create({
  title: "remera",
  photo: "picture.png",
  category: "prenda",
  price: 90,
  stock: 100,
});

gestorDeProductos.create({
  title: "pantalon",
  photo: "picture.png",
  category: "prenda",
  price: 120,
  stock: 100,
});

gestorDeProductos.create({
  title: "campera",
  photo: "picture.png",
  category: "prenda",
  price: 180,
  stock: 80,
});

console.log(gestorDeProductos.read());
console.log(gestorDeProductos.readOne(""))
