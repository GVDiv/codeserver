# codeserver

                        ---------------Sprint_8---------------

vistas:
   home: http://localhost:8080/index.html,
        productos y paginacion
   product detail: http://localhost:8080/pages/details.html?id=663a4b2f7d424fb06cc1766f,
        imagen, decripcion, precio, input numerico y boton de compra - FUNCIONAL
    login: http://localhost:8080/pages/login.html
        formulario de acceso requiere email y password - FUNCIONAL
        link de registro
    register: http://localhost:8080/pages/register.html,
        formulario de registro requiere como minimo email y password - FUNCIONAL
        link de login
    profile: http://localhost:8080/pages/profile.html,
        foto de prefil, user y rol
    cart: http://localhost:8080/pages/cart.html
        lista de productos comprados con su boton de eliminar
        seccion de resumen con boton de compra
        al finalizar la compra se borran los productos- FUNCIONAL
    
se agrego la estrategia de passport + jwt

se agrego el CustomRouter y se modificaron todas las rutas de las api
                    
se agrego las politicas de usuario para role 0(user) y role 1(admin)

    
