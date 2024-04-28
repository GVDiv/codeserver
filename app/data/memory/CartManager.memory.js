import crypto from "crypto";

class CartManager {
  static #cart = [];

  create(data) {
    try {
      if (!data) {
        const error = new Error("Add product to cart");
        throw error;
      } else {
        const cart = {
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity,
          state: data.state,
        };
        CartManager.#cart.push(cart);
        console.log("cart full");
      }
    } catch (error) {
      console.log(error);
    }
  }

  read(){
    try {
        let allCarts = CartManager.#cart;
        if(!allCarts){
            const error = new Error("Not found carts")
            throw error
        } else {
            console.log("Carts")
            return allCarts
        }
    } catch (error) {
        console.log(error)
    }
  }

  readOne(user_id){
    try {
        let all = CartManager.#cart
        let one = all.find((each)=> each.user_id === user_id)
        if(!one){
            const error = new Error("Not found cart user_id")
            throw error
        } else {
            console.log(` ${one.user_id}´s cart`)
            return one
        }
    } catch (error) {
        console.log(error)
    }
  }

  destroy(user_id){
    try {
        let all = CartManager.#cart
        let one = all.find(each => each.user_id === user_id)
        if(!one){
            throw new Error("Not found or removed")
        } else {
            let filtered = all.filter(each => each.user_id !== user_id)
            console.log(`cart of ${one.user_id} removed`)
            return one
        }
    } catch (error) {
        console.log(error)
    }
  }
}

const gestorDeCarts = new CartManager();

gestorDeCarts.create({
    user_id: "munky001",
    product_id: "cuadro001",
    quantity: 10,
    state: "reservado",
})

gestorDeCarts.create({
    user_id: "gabo002",
    product_id: "dibujo002",
    quantity: 5,
    state: "reservado",
})


console.log(gestorDeCarts.read())
//console.log(gestorDeCarts.readOne("gabo002"))
//console.log(gestorDeCarts.destroy("gabo002"))
//console.log(gestorDeCarts.destroy("gabo002"))


