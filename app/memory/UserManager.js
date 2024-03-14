class UsersManager {
    static #users = [];
  
    create(data) {
      const user = {
        id:
          UsersManager.#users.length == 0
            ? 1
            : UsersManager.#users[UsersManager.#users.length - 1].id +
              1,
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      UsersManager.#users.push(user);
      console.log("usuario creado");
    }
  
    read() {
      return UsersManager.#users;
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