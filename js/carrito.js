const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito"));


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector(".carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorCarritoAccionesDerecha = document.querySelector(".carrito-acciones-derecha")


function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("dissable");
        contenedorCarritoProductos.classList.remove("dissable");
        contenedorCarritoAcciones.classList.remove("dissable");
        contenedorCarritoComprado.classList.add("dissable");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="ri-delete-bin-line"></i></i>
                </button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("dissable");
        contenedorCarritoProductos.classList.add("dissable");
        contenedorCarritoAcciones.classList.add("dissable");
        contenedorCarritoComprado.classList.add("dissable");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id == idBoton);
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    console.log(productosCarrito.length)
    if(productosCarrito.length==0){
        contenedorCarritoAcciones.classList.add("dissable")
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    cargarProductosCarrito();
    localStorage.clear();
    contenedorCarritoAcciones.classList.add("dissable");
}


function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    
    productosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
    
    contenedorCarritoVacio.classList.add("dissable");
    contenedorCarritoProductos.classList.add("dissable");
    contenedorCarritoAcciones.classList.add("dissable");
    contenedorCarritoAcciones.classList.remove("carrito-acciones")
    contenedorCarritoComprado.classList.remove("dissable");
    contenedorTotal.classList.add("dissable")
    localStorage.clear()

}