const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado");
    } else {
      console.log("archivo ya existe");
    }
  }

  async create(data) {
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
        let allProducts = await fs.promises.readFile(this.path, "utf-8");
        allProducts = JSON.parse(allProducts);
        allProducts.push(product);
        allProducts = JSON.stringify(allProducts, null, 2);
        await fs.promises.writeFile(this.path, allProducts);
        console.log("Producto creado");
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductManager();

async function test() {
  try {
    const product = new ProductManager();
    product.create({
      title: "zapatilla",
      photo: "picture.png",
      category: "calzado",
      price: 100,
      stock: 20,
    });
  } catch (error) {
    console.log(error);
  }
}

test();
