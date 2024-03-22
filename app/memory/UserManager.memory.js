const crypto = require("crypto");

class UsersManager {
  static #users = [];

  create(data) {
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
          UsersManager.#users.push(user);

          console.log("usuario creado");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  read() {
    try{
    let users = UsersManager.#users;
      if(!users){
        const error = new Error("No hay usuarios")
        console.log(error)
      } else{
        return users;
      }    
  } catch (error){
    console.log("No hay usuarios")
    throw error
  }
  }

  readOne(id) {
    try {
      let users = UsersManager.#users
      let encontrado = users.find((each) => each.id === id); 
      if(!encontrado){
        const error = new Error("No hay usuario con ese id")
        console.log(error)
      } else {
        return encontrado
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
    const usuariosFiltrados = UsersManager.#users.filter((each) => each.id !== id);
    if(usuariosFiltrados === UsersManager.#users){
      throw new Error("Usuario no existente")
    }else{
      UsersManager.#users = usuariosFiltrados;
    }
  } catch (error) {
    throw error;
  }
  }
}

const gestorDeUsuarios = new UsersManager();
gestorDeUsuarios.create({
  photo: "user.png",
  email: "gabriel@gmail.com",
  password: "gabriel123",
  role: 1,
});

gestorDeUsuarios.create({
  photo: "user.png",
  email: "sabrina@gmail.com",
  password: "sabrina123",
  role: 2,
});

console.log(gestorDeUsuarios.read());
console.log(gestorDeUsuarios.readOne("9cd22e4831c30a75895db9ba"));
