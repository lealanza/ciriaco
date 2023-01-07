const copyMenu = () => {
    var dptCategory = document.querySelector('.dpt-cat')
    var dptPlace = document.querySelector('.departments')
    dptPlace.innerHTML = dptCategory.innerHTML;
    var mainNav = document.querySelector('.header-nav nav')
    var navPlace = document.querySelector('.off-canvas nav')
    navPlace.innerHTML = mainNav.innerHTML;
    let topNav = document.querySelector('.header-top .wrapper')
    var topPlace = document.querySelector('.off-canvas .thetop-nav')
    topPlace.innerHTML = topNav.innerHTML;

}

copyMenu();

const menuButton = document.querySelector('.trigger'), 
        closeButton = document.querySelector('.t-close'),
        addClass = document.querySelector('.site');


menuButton.addEventListener('click', function(){
    addClass.classList.toggle('showmenu')
});
closeButton.addEventListener('click', function(){
    addClass.classList.remove('showmenu')
});

const submenu = document.querySelectorAll('.has-child');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle (e){
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand'): null);
    if(this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand')
}


const divProductos = document.getElementById('div-container-productos');
const btnCategory = document.querySelectorAll('.btn-categoria');
const changeTitle = document.getElementById('titulo-principal');
let btnAddProduct = document.querySelectorAll(".btd-add-product");
const numberCart = document.getElementById('numerito')


cargarProductos = (productosElegidos) => {
    console.log(productosElegidos)
    divProductos.innerHTML = "";
    productosElegidos.forEach((producto) => {
        console.log(producto)
        const div = document.createElement('div');
        /* div.classList.add('producto');*/
        div.innerHTML = `<div class="producto">
        <img class="prodcuto-imagen" src="${producto.imagen}">
        <div class="productos-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="btd-add-product" id="${producto.id}">Agregar</button>
        </div>
    </div> 
        `;
        divProductos.append(div);
        
    });
   refreshBtnAdd();
   
};
const refreshBtnAdd = () =>{
    btnAddProduct = document.querySelectorAll('.btd-add-product');
    btnAddProduct.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)});
}

const productosCarrito= [];

const agregarCarrito = (e) =>{
    const idBtn = e.currentTarget.id;
    const productoAdd = listaDeProductos.find(producto => producto.id===idBtn);
    if(productosCarrito.some(producto => producto.id===idBtn)){
        const index = productosCarrito.findIndex(producto => producto.id===idBtn)
        productosCarrito[index].cantidad++;
    } else {
        productoAdd.cantidad = 1;
        productosCarrito.push(productoAdd);
    }
    refreshNumberCart()
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}
const refreshNumberCart =()=>{
    let numerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numberCart.innerHTML=numerito;
}
cargarProductos(listaDeProductos);

cargarDetallesProductos=(productosElegidos) => {
    console.log(productosElegidos)
    divProductos.innerHTML = "";
    productosElegidos.forEach((producto) => {
        console.log(producto)
        const div = document.createElement('div');
        /* div.classList.add('producto');*/
        div.innerHTML = `<div class="producto">
        <img class="prodcuto-imagen" src="${producto.imagen}">
        <div class="productos-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <p class="producto-precio">${producto.description}</p>

            <button class="btd-add-product" id="${producto.id}">Agregar</button>
        </div>
    </div> 
        `;
        divProductos.append(div);
        
    });
   refreshBtnAdd();
   
};

btnCategory.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategory.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productosCategorias = listaDeProductos.find(producto => producto.categoria.id === e.currentTarget.id )
            changeTitle.innerHTML= productosCategorias.categoria.nombre;
            const productoBtn = listaDeProductos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarDetallesProductos(productoBtn)
        } else {
            changeTitle.innerHTML = "Todos los productos"
            cargarProductos(listaDeProductos)
        }
    })
});