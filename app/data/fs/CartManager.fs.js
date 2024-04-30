import fs from "fs";

class CartManager {
  constructor() {
    this.path = "./app/data/fs/files/carts.json";
    this.init();
  }
  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("File cart created");
    } else {
      console.log("File cart already exists");
    }
  }
  //CREATE
  async create(data) {
    try {
      if (!data) {
        const error = new Error("Cart empty");
        throw error;
      } else {
        const cart = {
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity,
          state: data.state,
        };
        let allCarts = await fs.promises.readFile(this.path, "utf-8");
        allCarts = JSON.parse(allCarts);
        allCarts.push(cart);
        allCarts = JSON.stringify(allCarts, null, 2);
        await fs.promises.writeFile(this.path, allCarts);
        console.log("Cart full");
        return cart;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //UPDATE
  async update(user_id, data) {
    try {
      let one = await this.readOne(user_id);
      if (!one) {
        throw new Error("Cart not found");
      } else {
        let allCarts = await fs.promises.readFile(this.path, "utf-8");
        if (!allCarts) {
          throw new Error("Failed to read cart file");
        }
        allCarts = JSON.parse(allCarts);
        for (let key in data) {
          if (one.hasOwnProperty(key)) {
            one[key] = data[key];
          }
        }
        const index = allCarts.findIndex((cart) => cart.user_id === id);
        allCarts[index] = one;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allCarts, null, 2)
        );
        console.log(`Cart ${id} Updated`);
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async read(user_id = "all") {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      if (user_id !== "all") {
        //FILTRO QUERY
        allCarts = allCarts.filter((each) => each.user_id == user_id);
      }
      //SI NO HAY PRODUCTOS MOSTRAR AL USER
      if (allCarts.length === 0) {
        throw new Error("Cart Not Found");
      } else {
        console.log(allCarts);
        return allCarts;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //READONE
  async readOne(user_id) {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let one = allCarts.find((each) => each.user_id === user_id);
      if (!one) {
        throw new Error("Cart Not Found");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
      //throw error
    }
  }
  //DESTROY
  async destroy(user_id) {
    try {
      let allCarts = await fs.promises.readFile(this.path, "utf-8");
      allCarts = JSON.parse(allCarts);
      let one = allCarts.find((each) => each.user_id === user_id);
      if (!one) {
        throw new Error("Cart Not Found");
        //const error = new Error("Cart not found")
        //error.statusCode = 404
        //throw error
      } else {
        let filtered = allCarts.filter((each) => each.user_id !== user_id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log(`Cart ${one.user_id} Removed`);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

//create cart test
async function testCreate() {
    try {
        const gestorDeCarts = new CartManager();
        await gestorDeCarts.create({
            user_id: "munky001",
            product_id: "cuadro001",
            quantity: 10,
            state: "reserved",
        })

        await gestorDeCarts.create({
            user_id: "gabo002",
            product_id: "dibujo001",
            quantity: 5,
            state: "paid",
        })
    } catch (error) {
        console.log(error)
    }
}

const cartManager = new CartManager();
export default cartManager;

async function testRead() {
    cartManager.read()
}

async function testReadOne(){
    cartManager.readOne("munky001")
}

async function testDestroy(){
    cartManager.destroy("munky001")
}

testCreate()
//testRead()
//testReadOne()
//testDestroy()
