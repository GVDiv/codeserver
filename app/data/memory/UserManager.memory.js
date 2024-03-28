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

  async read() {
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

  // con el el id de cripto, este se genera cada vez que se corre el programa
  // para probar los metodos readOne y destroy usamos el mail
  readOne(email) {
    try {
      let users = UsersManager.#users
      let encontrado = users.find((each) => each.email === email); 
      if(!encontrado){
        const error = new Error("No hay usuario con ese email")
        console.log(error)
      } else {
        return encontrado
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(email) {
    try {
    const usuariosFiltrados = UsersManager.#users.filter((each) => each.email !== email);
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

 function testCreate() {
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

 function testRead() {
  const gestorDeUsuarios = new UsersManager();
  console.log(gestorDeUsuarios.read());
}

 function testReadOne(username) {
  const gestorDeUsuarios = new UsersManager();
  console.log(gestorDeUsuarios.readOne(username));
}

 function testDestroy(username) {
  const gestorDeUsuarios = new UsersManager();
  gestorDeUsuarios.destroy(username);
}

function run (){
testCreate()  //exito
testRead()    //exito
testReadOne("jose@gmail.com") // exito
testDestroy("anibal@gmail.com") // exito
testRead()  
}

run()