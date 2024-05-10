import crypto from "crypto";

class UserManager {
  static #users = [];

  create(data) {
    try {
      if (!data) {
        const error = new Error("ingrese datos");
        throw error;
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: data.role,
        };
        UserManager.#users.push(user);
        console.log("usuario creado");
      }
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      let allUsers = UserManager.#users;
      if (!allUsers) {
        const error = new Error("no hay usuarios");
        console.log(error);
      } else {
        console.log("users");
        return allUsers;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id){
    try {
        let allUsers = UserManager.#users
        let one = allUsers.find((each) => each.id === id)
        if(!one){
            const error = new Error("user no encontrado")
            console.log(error)
        } else {
            return one
        }
    } catch (error) {
        throw error
    }
  }

  destroy(id){
    try {
        let allUsers = UserManager.#users
        let one = allUsers.find(each => each.id === id)
        if(!one){
            throw new Error("user no encontrado")
        } else {
            let filtered = allUsers.filter(each => each.id !== id)
            console.log(`user ${one.title} eliminado`)
            return one
        }
    } catch (error) {
        throw error
    }
  }
}
