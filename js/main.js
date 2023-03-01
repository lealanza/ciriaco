const divProductos = document.getElementById('div-container-productos');
const btnCategory = document.querySelectorAll('.btn-categoria');
const changeTitle = document.getElementById('titulo-principal');
const changeTitleAside = document.getElementById('titulo-aside');
let btnAddProduct = document.querySelectorAll(".btd-add-product");
const numberCart = document.querySelector('#numerito')
const searchInput = document.querySelector('#search-input')
const formu = document.getElementById("formulario");
const agregarBtn = document.querySelector("#idButton");
const divProductosDetails = document.getElementById("#div-container-productos-details")
const searchResultado = document.querySelector('.searchResultado')
const listMenu = document.querySelector('.list-menu')
let btnDetailsProducts = document.querySelectorAll('.btd-product')
const mostarResultados = document.querySelector('.div-tienda')
const cartTotal = document.querySelector('.cart-total')
const tituloH4Detalles = document.querySelector('.titulo-principal-detalles')
const btnBuild = document.querySelector(".btn-build")
const contendorVideos = document.querySelector(".mostrar-videos");
const heroImg = document.querySelector(".hero-img")
const btnClose = document.querySelector(".btd-close");
const pageSite = document.querySelector(".main");
const videoDelete = document.querySelector(".video-iframe")
const heroContainer = document.querySelector(".hero-container")
const rowBanner = document.querySelector(".row-banner")
const successModal = document.querySelector(".add-modal")
const btnEnviarFormu  = document.querySelector(".btn-self-style");
const contactos = document.querySelector(".div-line-contact")
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
//se muestra un video en el hero
const mostrarVideo = () => {
    contendorVideos.classList.toggle("disabled");
    heroImg.classList.toggle("disabled")
    contendorVideos.innerHTML=`<iframe  class="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/zHfTIWXIGuw"></iframe>`
}
const toggleMenu = (event) =>{
    this.classList.toggle('is-active');
    document.querySelector( ".menuppal" ).classList.toggle("is_active");
    event.preventDefault();
}
//buscador de productos
const search = () => {
    const texto = searchInput.value.toLowerCase();
    divProductos.innerHTML = "";
    for (let producto of listaDeProductos) {
        let titulo = producto.titulo.toLowerCase();
        if (titulo.indexOf(texto) !== -1) {
            changeTitleAside.classList.toggle("disabled")
            contactos.classList.add("disabled")
            heroContainer.classList.add("disabled")
            heroContainer.classList.remove("hero-container")
            rowBanner.classList.remove("row-banner")
            rowBanner.classList.add("disabled")
            searchResultado.classList.add("disabled")
            listMenu.classList.remove("list-menu")
            listMenu.classList.add("searchresult")
            mostarResultados.classList.remove("div-tienda")
            mostarResultados.classList.add("div-tienda-resultado")
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="producto">
                <img class="prodcuto-imagen" src="${producto.imagen}">
                <div class="productos-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="btd-product" id="${producto.id}"  data-id='${producto.id}'>Detalles</button>
                    <button class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'>Agregar</button>
                </div>
            </div>`;
            searchResultado.append(div);
            divProductos.append(div);
        }
        refreshBtnAdd();
    }
    if (searchResultado.innerHTML ==" ") {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="producto">
                <div class="productos-detalles">
                    <h3 class="producto-titulo">Producto no encontrado</h3>
                </div>
        </div>
        `;
        searchResultado.append(div);
    }
};
//se cargan todos los prodcutos en el DOM
cargarProductos = (productosElegidos) => {
    searchResultado.classList.add("disabled")
    tituloH4Detalles.classList.toggle("disabled")
    changeTitle.classList.remove("disabled")
    contactos.classList.remove("disabled")
    rowBanner.classList.add("row-banner")
    heroContainer.classList.add("hero-container")
    divProductos.innerHTML = "";
    productosElegidos.forEach((producto) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="producto">
            <img class="prodcuto-imagen" src="${producto.imagen}">
            <div class="productos-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <a class="btd-product" id="${producto.id}" data-id='${producto.id}' href="#tienda">Detalles</a>
                <a class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'>Agregar</a>
            </div>
        </div>`;
        divProductos.append(div);

    });
    refreshBtnAdd();
};
//se renderiza el detalle segun el producto seleccionado
cargarProductosDetallado = (productosElegidos) => {
    divProductos.innerHTML = "";
    searchResultado.innerHTML = "";
    productosElegidos.forEach((producto) => {
        changeTitleAside.classList.add("disabled")
        changeTitle.classList.add("disabled")
        tituloH4Detalles.classList.remove("disabled")
        tituloH4Detalles.classList.add("active")
        searchResultado.classList.remove("disabled")
        heroContainer.classList.add("disabled")
        heroContainer.classList.remove("hero-container")
        listMenu.classList.remove("list-menu")
        listMenu.classList.add("searchresult")
        rowBanner.classList.remove("row-banner")
        rowBanner.classList.add("disabled")
        contactos.classList.add("disabled")
        mostarResultados.classList.remove("div-tienda")
        mostarResultados.classList.add("div-tienda-resultado")
        const div = document.createElement('div');
        const fichaResult = JSON.stringify(producto.ficha);
        tituloH4Detalles.innerHTML = producto.titulo;
        if (fichaResult === "undefined") {
            console.log(fichaResult)
        }
        div.innerHTML = `
        <div class="producto-contendor-resultado" id="producto-contendor-resultado">
            <img class="prodcuto-imagen" src="${producto.imagen}">
            <div class="productos-detalles-resultado">
                <h3 class="producto-titulo-detalles">${producto.titulo}</h3>
                <p>${producto.description}</p>
                <p class="producto-precio-detalles">$${producto.precio}</p>
                <a class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'> Comprar </a>
                </div>
                
        </div>`;
        searchResultado.append(div);
        refreshBtnAdd();
    });
    refreshBtnAdd();
};
const mostarDetalles = (e) => {
    const idBtn = e.currentTarget.id;
    const productoid = listaDeProductos.filter(producto => producto.id == idBtn);
    cargarProductosDetallado(productoid);
}
const refreshBtnAdd = () => {
    btnAddProduct = document.querySelectorAll('.btd-add-product');
    btnAddProduct.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    });
    btnDetailsProducts = document.querySelectorAll('.btd-product');
    btnDetailsProducts.forEach(boton => {
        boton.addEventListener("click", mostarDetalles)
    });
}
//carga de productos en el carrito y local storage
let productosCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || [];;
const agregarCarrito = (e) => {
    const idBtn = e.currentTarget.id;
    const productoAdd = listaDeProductos.find(producto => producto.id == idBtn);
    if (productosCarrito.some(producto => producto.id == idBtn)) {
        const index = productosCarrito.findIndex(producto => producto.id == idBtn)
        productosCarrito[index].cantidad++;
    } else {
        productoAdd.cantidad = 1;
        productosCarrito.push(productoAdd);
    }
    showSuccesModal('El producto se ha agregado al carrito');
    actualizarTotal();
    refreshNumberCart();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}
//actuzaliza el numerito del carrito
const refreshNumberCart = () => {
    let numerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numberCart.innerHTML = numerito;
}
//llama a la funcion para mostrar todos los productos en el DOM
cargarProductos(listaDeProductos);
//MUESTRA EL MODAL
const showSuccesModal = msg => {
    successModal.classList.add('active-modal');
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove('active-modal');
    }, 1500);
  };
//Lista menu lateral y filtrado 
btnCategory.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategory.forEach(boton => boton.classList.toggle("active"));
        if (e.currentTarget.id != "todos") {
            contactos.classList.remove("disabled")
            changeTitleAside.classList.remove("disabled")
            listMenu.classList.add("list-menu")
            listMenu.classList.remove("searchresult")
            mostarResultados.classList.add("div-tienda")
            mostarResultados.classList.remove("div-tienda-resultado")
            const productosCategorias = listaDeProductos.find(producto => producto.categoria.id == e.currentTarget.id)
            changeTitle.innerHTML = productosCategorias.categoria.id;
            changeTitleAside.innerHTML = productosCategorias.categoria.id;
            const productoBtn = listaDeProductos.filter(producto => producto.categoria.id == e.currentTarget.id)
            cargarProductos(productoBtn)
            refreshBtnAdd();
        } else {
            searchResultado.classList.add("disabled")
            changeTitleAside.classList.remove("disabled")
            listMenu.classList.add("list-menu")
            listMenu.classList.remove("searchresult")
            mostarResultados.classList.add("div-tienda")
            mostarResultados.classList.remove("div-tienda-resultado")
            contactos.classList.remove("disabled")
            changeTitle.innerHTML = "Todos los productos"
            changeTitleAside.innerHTML = "Todos los productos"
            cargarProductos(listaDeProductos)
            refreshBtnAdd();
        }
    })
});
//se mantiene el numero de prodcutos guardado en el local storage

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    cartTotal.innerText = `$${totalCalculado}.00`;
}
// funcion para remover y parar el video en el dom y evitar que se siga ejecutando en segundo plano
function removerVideo () {
    $( ".video-iframe" ).remove();
}
const scrolling = () => {
    contendorVideos.classList.add("disabled");
    contendorVideos.classList.remove("mostrar-videos")
    heroImg.classList.remove("disabled")
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
    removerVideo()
};
const reloadWeb=()=>{
    showSuccesModal('Gracias por enviar la consulta')
    setTimeout(()=>{
        window.location.href = 'index.html'
      }, 2000)
}
document.addEventListener('DOMContentLoaded', refreshNumberCart)
document.addEventListener("DOMContentLoaded", actualizarTotal)
window.addEventListener('scroll', scrolling)
btnEnviarFormu.addEventListener('click', reloadWeb)
btnBuild.addEventListener('click', mostrarVideo);
searchInput.addEventListener('keyup', search);
agregarBtn.addEventListener('click', search);
