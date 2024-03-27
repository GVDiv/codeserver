const fs = require("fs");
const crypto = require("crypto");
const { error } = require("console");

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
    try {
      if (!data) {
        const error = new Error("No hay usuario");
        throw error;
      } else {
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
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("No hay usuarios");
      throw error;
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users.find((each) => each.id === id);
    } catch (error) {
      console.log("No hay usuario con ese Id");
      throw error;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      console.log("users" + users);
      let filtered = users.filter((each) => each.id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      console.log("filtered" + filtered);
      await fs.promises.writeFile(this.path, filtered);
    } catch (error) {
      console.log("No hay usuario con ese Id");
      throw error;
    }
  }
}

async function testCreate() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    photo: "user.png",
    email: "gabriel@gmail.com",
    password: "gabriel123",
    role: 1,
  });

  await gestorDeUsuarios.create({
    photo: "user.png",
    email: "sabrina@gmail.com",
    password: "sabrina123",
    role: 2,
  });

  gestorDeUsuarios.create({
    photo: "user.png",
    email: "anibal@gmail.com",
    password: "anibal123",
    role: 2,
  });
  
  
  gestorDeUsuarios.create({
    photo: "user.png",
    email: "jose@gmail.com",
    password: "jose123",
    role: 1,
  });
}
async function testRead() {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.read());
}

async function testReadOne(id) {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.readOne(id));
}

async function testDestroy(id) {
  const gestorDeUsuarios = new UserManager();
  gestorDeUsuarios.destroy(id);
}

//testCreate()  //exito
//testRead()    //exito
//testReadOne("2ddc7f23a6de8bf9be5bb2c4") // exito
//testDestroy("842a21963b135fb5be141a7c") // exito
const fs = require("fs");
const crypto = require("crypto");
const { error } = require("console");

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
    try {
      if (!data) {
        const error = new Error("No hay usuario");
        throw error;
      } else {
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
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users;
    } catch (error) {
      console.log("No hay usuarios");
      throw error;
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      return users.find((each) => each.id === id);
    } catch (error) {
      console.log("No hay usuario con ese Id");
      throw error;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      console.log("users" + users);
      let filtered = users.filter((each) => each.id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      console.log("filtered" + filtered);
      await fs.promises.writeFile(this.path, filtered);
    } catch (error) {
      console.log("No hay usuario con ese Id");
      throw error;
    }
  }
}

async function testCreate() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    photo: "user.png",
    email: "gabriel@gmail.com",
    password: "gabriel123",
    role: 1,
  });

  await gestorDeUsuarios.create({
    photo: "user.png",
    email: "sabrina@gmail.com",
    password: "sabrina123",
    role: 2,
  });
}
async function testRead() {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.read());
}

async function testReadOne(id) {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.readOne(id));
}

async function testDestroy(id) {
  const gestorDeUsuarios = new UserManager();
  gestorDeUsuarios.destroy(id);
}

//testCreate()  //exito
//testRead()    //exito
//testReadOne("2ddc7f23a6de8bf9be5bb2c4") // exito
//testDestroy("842a21963b135fb5be141a7c") // exito
