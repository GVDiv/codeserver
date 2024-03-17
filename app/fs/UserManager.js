const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./app/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Creado");
    } else {
      console.log("Ya existia");
    }
  }

  async create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo:
        data.photo ||
        "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
      email: data.email,
      password: data.password,
      role: data.role,
    };

    if (!data.email || !data.password || !data.role) {
      console.log("Usuario no creado, ingrese todos los datos");
    } else {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);

      console.log("usuario creado");
      users = JSON.stringify(users, null, 2);
      await fs.promises.writeFile(this.path, users);
    }
  }

  async read() {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users;
    //agregar try catch y condicional en caso de que no haya usuarios
  }

  async readOne(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users.find((each) => each.id === id);
    //agregar try catch y condicional en caso de no encontrar el usuario
  }

  async destroy(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);

    const filtered = users.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    //agregar try catch y condicional en caso de no encontrar usuario
  }
}

async function test(){
    const gestorDeUsuarios = new UserManager();
    // await gestorDeUsuarios.create({
    //     photo: "user.png",
    //     email: "gabriel@gmail.com",
    //     password: "gabriel123",
    //     role: 1,
    //   });
    
    //   await gestorDeUsuarios.create({
    //     photo: "user.png",
    //     email: "sabrina@gmail.com",
    //     password: "sabrina123",
    //     role: 2,
    //   })

    console.log(await gestorDeUsuarios.read());
    console.log(await gestorDeUsuarios.readOne(/*id*/""));
}

test()