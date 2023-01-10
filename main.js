const divProductos = document.getElementById('div-container-productos');
const btnCategory = document.querySelectorAll('.btn-categoria');
const changeTitle = document.getElementById('titulo-principal');
const changeTitleAside = document.getElementById('titulo-aside');
let btnAddProduct = document.querySelectorAll(".btd-add-product");
const numberCart = document.querySelector('#numerito')
const searchInput = document.getElementById("#search-input")
const formu = document.getElementById("formulario");
const agregarBtn = document.getElementById("idButton");
const divProductosDetails = document.getElementById("#div-container-productos-details")


cargarProductos = (productosElegidos) => {

    divProductos.innerHTML = "";
    productosElegidos.forEach((producto) => {
        const div = document.createElement('div');

        div.innerHTML = `<div class="producto">
        <img class="prodcuto-imagen" src="${producto.imagen}">
        <div class="productos-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <a href="detalles.html" class="btd-details-product btd-product" id="${producto.id}">Detalles</a>
            <a class="btd-add-product" id="${producto.id}">Agregar</a>
        </div>
        
        </div>
    </div> 
        `;
        divProductos.append(div);

    });
    refreshBtnAdd();

};

const refreshBtnAdd = () => {
    btnAddProduct = document.querySelectorAll('.btd-add-product');
    btnAddProduct.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    });
}
const productosCarrito = [];

const agregarCarrito = (e) => {
    const idBtn = e.currentTarget.id;
    const productoAdd = listaDeProductos.find(producto => producto.id == idBtn);

    if (productosCarrito.some(producto => producto.id == idBtn)) {
        const index = productosCarrito.findIndex(producto => producto.id == idBtn)

        productosCarrito[index].cantidad++;
        listaDeProductos.cantidad--;

    } else {
        productoAdd.cantidad;
        productosCarrito.push(productoAdd);
        productoAdd.cantidad - 1;
    }
    refreshNumberCart();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

const refreshNumberCart = () => {
    let numerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numberCart.innerHTML = numerito;
}


cargarProductos(listaDeProductos);


btnCategory.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategory.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productosCategorias = listaDeProductos.find(producto => producto.categoria.id === e.currentTarget.id)
            changeTitle.innerHTML = productosCategorias.categoria.id;
            changeTitleAside.innerHTML = productosCategorias.categoria.id;
            const productoBtn = listaDeProductos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productoBtn)
        } else {
            changeTitle.innerHTML = "Todos los productos"
            cargarProductos(listaDeProductos)
        }
    })
});


document.addEventListener("keyup", e => {
    if (e.target.matches("#search-input")) {
        document.querySelectorAll(".producto").forEach(producto => {
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? producto.classList.remove("dissable")
                : producto.classList.add("dissable")
            })
    }
});