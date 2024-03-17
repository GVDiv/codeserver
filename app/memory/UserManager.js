const crypto = require("crypto")

class UsersManager {
    static #users = [];
  
    create(data) {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo || "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if(!data.email || !data.password || !data.role){
        console.log("Usuario no creado, ingrese todos los datos");
      }
      else{
        UsersManager.#users.push(user);
        
      console.log("usuario creado");
      }
    }
  
    read() {
      return UsersManager.#users;
      //agregar try catch y condicional en caso de que no haya usuarios
    }

    readOne(id){
      return UsersManager.#users.find(each => each.id === id);
      //agregar try catch y condicional en caso de no encontrar el usuario
    }

    destroy(id){
      const filtered = UsersManager.#users.filter(each => each.id !== id)
      UsersManager.#users = filtered;
      //agregar try catch y condicional en caso de no encontrar usuario
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
  })
  
  console.log(gestorDeUsuarios.read());