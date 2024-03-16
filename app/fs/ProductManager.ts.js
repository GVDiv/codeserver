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

async function test() {
  try {
    const gestorDeProductosproduct = new ProductManager();

    await gestorDeProductosproduct.create({
      title: "zapatilla",
      photo: "zapatilla.png",
      category: "calzado",
      price: 100,
      stock: 20,
    });

    await gestorDeProductosproduct.create({
      title: "ojotas",
      photo: "ojotas.png",
      category: "calzado",
      price: 90,
      stock: 100,
    });

    await gestorDeProductosproduct.create({
      title: "zapatos",
      photo: "zapatilla.png",
      category: "calzado",
      price: 120,
      stock: 30,
    });

    await gestorDeProductosproduct.create({
      title: "sandalias",
      photo: "sandalias.png",
      category: "calzado",
      price: 90,
      stock: 50,
    });

    await gestorDeProductosproduct.create({
      title: "remera",
      photo: "remera.png",
      category: "Deportivo",
      price: 120,
      stock: 200,
    })

    await gestorDeProductosproduct.create({
      title: "remera",
      photo: "remera.png",
      category: "Casual",
      price: 90,
      stock: 500,
    })

    await gestorDeProductosproduct.create({
      title: "campera",
      photo: "campera.png",
      category: "Deportivo",
      price: 190,
      stock: 120,
    })

    await gestorDeProductosproduct.create({
      title: "campera",
      photo: "campera.png",
      category: "Vintage",
      price: 220,
      stock: 50,
    })

    await gestorDeProductosproduct.create({
      title: "gorra",
      photo: "gorra.png",
      category: "Casual",
      price: 70,
      stock: 300,
    })

    await gestorDeProductosproduct.create({
      title: "anteojos",
      photo: "anteojos.png",
      category: "de sol Hombres",
      price: 70,
      stock: 300,
    })

  } catch (error) {
    console.log(error);
  }
}

test();





