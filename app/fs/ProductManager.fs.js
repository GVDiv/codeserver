import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./app/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("File Created");
    } else {
      console.log("File Already Exists");
    }
  }
  //METODO CREATE
  async create(data) {
    try {
      if (!data) {
        const error = new Error("Enter Product");
        throw error;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fcs%2Fimage-vector%2Fdefault-image-icon-vector-missing-picture-2086941550&psig=AOvVaw26CZV9A_gfpysE8kwVaif_&ust=1710695707533000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJCo5KKk-YQDFQAAAAAdAAAAABAJ",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let allProducts = await fs.promises.readFile(this.path, "utf-8");
        allProducts = JSON.parse(allProducts);
        allProducts.push(product);
        allProducts = JSON.stringify(allProducts, null, 2);
        await fs.promises.writeFile(this.path, allProducts);
        console.log("Product Created");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //METODO UPDATE
  async update(id, data) {
    try {
      let one = await this.readOne(id); // Esperar la lectura del producto con el id proporcionado
      if (!one) {
        throw new Error("Product Not Found");
      } else {
        let allProducts = await fs.promises.readFile(this.path, "utf-8");
        if (!allProducts) {
          throw new Error("Failed to read products file");
        }
        allProducts = JSON.parse(allProducts);
        // Recorrer todas las propiedades del objeto data
        for (let key in data) {
          // Verificar si la propiedad existe en el objeto one antes de actualizarla
          if (one.hasOwnProperty(key)) {
            one[key] = data[key]; // Actualizar la propiedad con el valor proporcionado en data
          }
        }
        // Encontrar el índice del producto con el id proporcionado
        const index = allProducts.findIndex((product) => product.id === id);
        // Reemplazar el producto actualizado en la lista de productos
        allProducts[index] = one;
        // Escribir la lista de productos actualizada en el archivo
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allProducts, null, 2)
        );
        console.log(`Product ${id} Updated`);
        return one; // Devolver el producto actualizado
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //METODO READ CON FILTRO POR QUERY
  async read(cat = "all") {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      if (cat !== "all") {
        //FILTRO QUERY
        allProducts = allProducts.filter((each) => each.category == cat);
      }
      //SI NO HAY PRODUCTOS MOSTRAR AL USER
      if (allProducts.length === 0) {
        throw new Error("Products Not Found");
      } else {
        console.log(allProducts);
        return allProducts;
      }
    } catch (error) {
      console.log(error);
      //throw error
    }
  }

  //METODO READONE ID
  async readOne(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let one = allProducts.find((each) => each.id === id);
      if (!one) {
        throw new Error("Product Not Found");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
      //throw error
    }
  }

  //METODO DESTROY
  async destroy(id) {
    try {
      let allProducts = await fs.promises.readFile(this.path, "utf-8");
      allProducts = JSON.parse(allProducts);
      let one = allProducts.find((each) => each.id === id);
      if (!one) {
        throw new Error("Product Not Found");
        //const error = new Error("Product not found")
        //error.statusCode = 404
        //throw error
      } else {
        let filtered = allProducts.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(`Product ${one.title} Removed`);
        return one;
      }
    } catch (error) {
      throw error
    }
  }
}

//CREACION DE PRODUCTOS
async function testCreate() {
  try {
    const gestorDeProductos = new ProductManager();
    await gestorDeProductos.create({
      title: "zapatilla",
      photo: "zapatilla.png",
      category: "calzado",
      price: 100,
      stock: 20,
    });

    await gestorDeProductos.create({
      title: "ojotas",
      photo: "ojotas.png",
      category: "calzado",
      price: 90,
      stock: 100,
    });

    await gestorDeProductos.create({
      title: "zapatos",
      photo: "zapatilla.png",
      category: "calzado",
      price: 120,
      stock: 30,
    });

    await gestorDeProductos.create({
      title: "sandalias",
      photo: "sandalias.png",
      category: "calzado",
      price: 90,
      stock: 50,
    });

    await gestorDeProductos.create({
      title: "remera",
      photo: "remera.png",
      category: "Deportivo",
      price: 120,
      stock: 200,
    });

    await gestorDeProductos.create({
      title: "remera",
      photo: "remera.png",
      category: "Casual",
      price: 90,
      stock: 500,
    });

    await gestorDeProductos.create({
      title: "campera",
      photo: "campera.png",
      category: "Deportivo",
      price: 190,
      stock: 120,
    });

    await gestorDeProductos.create({
      title: "campera",
      photo: "campera.png",
      category: "Vintage",
      price: 220,
      stock: 50,
    });

    await gestorDeProductos.create({
      title: "gorra",
      photo: "gorra.png",
      category: "Casual",
      price: 70,
      stock: 300,
    });

    await gestorDeProductos.create({
      title: "anteojos",
      photo: "anteojos.png",
      category: "de sol Hombres",
      price: 70,
      stock: 300,
    });
  } catch (error) {
    console.log(error);
  }
}

async function testRead() {
  const gestorDeProductos = new ProductManager();
  gestorDeProductos.read();
}

async function testReadOne() {
  const gestorDeProductos = new ProductManager();
  gestorDeProductos.readOne("");
}

async function testDestroy() {
  const gestorDeProductos = new ProductManager();
  gestorDeProductos.destroy("");
}

const productManager = new ProductManager();
export default productManager;

//testCreate();
//testRead()
//testReadOne()
//testDestroy();
