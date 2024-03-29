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
const successModal = document.querySelector(".add-modal")
const toggleButton = document.getElementById('button-menu')
const navWrapper = document.getElementById('nav')

toggleButton.addEventListener('click',() => {
  toggleButton.classList.toggle('close')
  navWrapper.classList.toggle('show')
})

navWrapper.addEventListener('click',e => {
  if(e.target.id === 'nav'){
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
  }
})
const scrolling = () => {
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
};
function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `<div class="carrito-producto-detalles">

                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
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
                </button></div>
                <div class="div-line"></div>
            `;
            contenedorCarritoProductos.append(div);
        })    
    actualizarBotonesEliminar();
    actualizarTotal();
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
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
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    console.log(productosCarrito.length)
    if(productosCarrito.length==0){
        localStorage.clear();
        showSuccesModal('Tu carrito ahora esta vacio');
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoAcciones.classList.remove("carrito-acciones")
    }
}
if(productosCarrito==null){
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoAcciones.classList.remove("carrito-acciones")
}
//funcion para vaciar el carrito
function vaciarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    cargarProductosCarrito();
    localStorage.clear();
    showSuccesModal('Tu carrito ahora esta vacio');
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoAcciones.classList.remove("carrito-acciones")
}
function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}
//muesta el modal al finalizar la compra
const showSuccesModal = msg => {
    successModal.classList.add('active-modal-cart');
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove('active-modal-cart'); 
      successModal.classList.add('disabled');
      reDirrecionar();
    }, 3000);
   
  };
//vuelve al index
const reDirrecionar = () =>{
       alert("Será redireccionado al inicio")
       
       setTimeout(()=>{
       window.location.href = 'index.html'
      }, 1000)
}
//funcion para realizar la compra del carrito
function comprarCarrito() {
    showSuccesModal('Gracias por tu compra!');
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoAcciones.classList.remove("carrito-acciones")
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorTotal.classList.add("disabled")
    localStorage.clear()    
}
botonComprar.addEventListener("click", comprarCarrito);
botonVaciar.addEventListener("click", vaciarCarrito);
window.addEventListener('scroll', scrolling)