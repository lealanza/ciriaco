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
const contendorVideos= document.querySelector(".mostrar-videos");
const btnClose = document.querySelector(".btd-close");
const pageSite = document.querySelector (".main");
const overlay = document.querySelector(".overlay");
const menuResponsive = document.querySelector(".menu-responsive")
const contenedorMenu = document.querySelector(".contenedor-menu")
const menuResponsiveAction = () => {
   
    contenedorMenu.innerHTML=`<div class="active" id="list-menu">
    <h4 class="titulo-principal">
    <a id="todos" class="btn-categoria btn-aside">
        Todos
    </a>
    <a id="cascos" class="btn-categoria btn-aside">
        Cascos
    </a>
    <a id="grupos" class="btn-categoria btn-aside">
        Grupos
    </a>
    <a id="mtb" class="btn-categoria btn-aside">
        Mtb
    </a>
    <a id="ruta" class="btn-categoria btn-aside">
        Ruta
    </a>
    <a id="componentes" class="btn-categoria btn-aside">
        Componentes
    </a>
</div>`
};

//se muestra un video en el hero
const mostrarVideo =()=>{
    contendorVideos.classList.add("mostrar-videos")
    contendorVideos.classList.remove("disabled");
    overlay.classList.add("show-overlay");
    btnClose.classList.remove("disabled");
    btnClose.classList.add("btd-close")
    contendorVideos.innerHTML = `
    <iframe width="800" height="600" src="https://www.youtube.com/embed/xZYTOe-9haM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}
//buscador de productos
const search = () => {
    const texto = searchInput.value.toLowerCase();
    divProductos.innerHTML = "";
    for (let producto of listaDeProductos) {
        let titulo = producto.titulo.toLowerCase();
        if (titulo.indexOf(texto) !== -1) {
            changeTitleAside.classList.add("disabled")
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
                    <button class="btd-product" id="${producto.id}" data-id='${producto.id}'>Detalles</button>
                    <button class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'>Agregar</button>
                </div>
            </div>`;
            searchResultado.append(div);
            divProductos.append(div);
        }
        refreshBtnAdd();
    }
    if (searchResultado.innerHTML === "") {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="producto-titulo">Producto no encontrado</h3>
        `;
        searchResultado.append(div);
            
    }
};
//se cargan todos los prodcutos en el DOM
cargarProductos = (productosElegidos) => {
    searchResultado.classList.add("disabled")
    tituloH4Detalles.classList.add("disabled")
    tituloH4Detalles.classList.remove("active")
    changeTitle.classList.remove("disabled")
    
    divProductos.innerHTML = "";
    productosElegidos.forEach((producto) => {
        
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="producto">
            <img class="prodcuto-imagen" src="${producto.imagen}">
            <div class="productos-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="btd-product" id="${producto.id}" data-id='${producto.id}'>Detalles</button>
                <button class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'>Agregar</button>

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
        listMenu.classList.remove("list-menu")
        listMenu.classList.add("searchresult")
        mostarResultados.classList.remove("div-tienda")
        mostarResultados.classList.add("div-tienda-resultado")
        const div = document.createElement('div');
        const fichaResult = JSON.stringify(producto.ficha);
        tituloH4Detalles.innerHTML =producto.titulo;
        if(fichaResult==="undefined"){
           console.log(fichaResult)
        }
        div.innerHTML = `
        <div class="producto-contendor-resultado">
            <img class="prodcuto-imagen" src="${producto.imagen}">
            <div class="productos-detalles-resultado">
                <h3 class="producto-titulo-detalles">${producto.titulo}</h3>
                <p>${producto.description}</p>
                <p class="producto-precio-detalles">$${producto.precio}</p>
                <button class="btd-add-product" id="${producto.id}" data-id='${producto.id}' data-nombre='${producto.nombre}' data-precio='${producto.precio}' data-imagen='${producto.imagen}' data-descripcion='${producto.descripcion}'> Comprar </button>
                </div>
                
        </div>`;
        searchResultado.append(div);
        refreshBtnAdd();
    });
    refreshBtnAdd();
};
const mostarDetalles = (e) => {
    const idBtn = e.currentTarget.id;
    const productoid= listaDeProductos.filter(producto => producto.id == idBtn);
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
console.log(productosCarrito)
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
    
    actualizarTotal();
    refreshNumberCart();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}
//actuzaliza el numerito del carrito
const refreshNumberCart = () => {
    let numerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numberCart.innerHTML = numerito;
}


cargarProductos(listaDeProductos);


btnCategory.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategory.forEach(boton => boton.classList.remove("active"));
        
        if (e.currentTarget.id != "todos") {
            
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
            
            changeTitleAside.classList.remove("disabled")
            listMenu.classList.add("list-menu")
            listMenu.classList.remove("searchresult")
            mostarResultados.classList.add("div-tienda")
            mostarResultados.classList.remove("div-tienda-resultado")
           
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
const cerrarVideo = () => {
    contendorVideos.classList.remove("mostrar-videos")
    contendorVideos.classList.add("disabled");
    btnClose.classList.add("disabled");
    overlay.classList.remove("show-overlay");
    overlay.classList.add("disabled");
    btnClose.classList.remove("btd-close")
};

const scrolling = ()=>{
    overlay.classList.remove("show-overlay");
    contendorVideos.classList.add("disabled");
    btnClose.classList.add("disabled");
    btnClose.classList.remove("btd-close")
    contendorVideos.classList.remove("mostrar-videos")
    contenedorMenu.classList.remove("active")
    contenedorMenu.classList.add("disabled")
    
};
document.addEventListener('DOMContentLoaded', refreshNumberCart)
document.addEventListener("DOMContentLoaded", actualizarTotal)
document.addEventListener("DOMContentLoaded", cerrarVideo)
window.addEventListener('scroll', scrolling)
btnClose.addEventListener('click', cerrarVideo)
btnBuild.addEventListener('click', mostrarVideo);
searchInput.addEventListener('keyup', search);
agregarBtn.addEventListener('click', search);
menuResponsive.addEventListener('click', menuResponsiveAction)