import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./app/data/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("File user created");
    } else {
      console.log("File users already exists");
    }
  }
  //METODO CREATE
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
            "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1",
          email: data.email,
          password: data.password,
          role: data.role,
        };
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        console.log("User Created");
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
  //METODO UPDATE
  async update(id, data) {
    try {
      let one = await this.readOne(id);
      if (!one) {
        throw new Error("User not found");
      } else {
        let allUsers = await fs.promises.readFile(this.path, "utf-8");
        if (!allUsers) {
          throw new Error("Failed to read users file");
        }
        allUsers = JSON.parse(allUsers);
        for (let prop in data) {
          if (one.hasOwnProperty(prop)) {
            one[prop] = data[prop];
          }
        }
        const index = allUsers.findIndex((user) => user.id === id);
        allUsers[index] = one;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(allUsers, null, 2)
        );
        console.log(`User ${one.id} Updated`);
        return one;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  //METODO READ CON FILTRO POR QUERY
  async read(role = "All") {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      if (role !== "All") {
        users = users.filter((each) => each.role == role);
      }
      if (users.length === 0) {
        throw new Error("User Not Found");
      } else {
        console.log(users);
        return users;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  //METODO READONE ID
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
  //METODO DESTROY
  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let one = users.find((each)=> each.id === id)
      if(!one){
        throw new Error("User not found")
      } else {
        let filtered = users.filter((each)=> each.id !== id)
        filtered = JSON.stringify(filtered, null, 2)
        await fs.promises.writeFile(this.path, filtered)
        console.log(`User ${one.email} Removed`);
        return one
      }
    } catch (error) {
      throw error
    }
  }
}
//CREACION DE USUARIOS
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
async function testRead(role) {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.read(role));
}

async function testReadOne(id) {
  const gestorDeUsuarios = new UserManager();
  console.log(await gestorDeUsuarios.readOne(id));
}

async function testDestroy(id) {
  const gestorDeUsuarios = new UserManager();
  gestorDeUsuarios.destroy(id);
}
const userManager = new UserManager();
export default userManager;

//testCreate()
//testRead(1); //exito
//testReadOne("2ddc7f23a6de8bf9be5bb2c4") // exito
//testDestroy("842a21963b135fb5be141a7c") // exito
