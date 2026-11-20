
let carrito = [];


function agregarAlCarrito(nombre, precio) {
    
    let producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);


    actualizarCarrito();

 
    mostrarNotificacion();
}

function actualizarCarrito() {
    let listaHTML = document.getElementById("lista-carrito");
    let contadorHTML = document.getElementById("contador-carrito");
    let totalHTML = document.getElementById("total-precio");

    contadorHTML.innerText = carrito.length;

    if (carrito.length === 0) {
        listaHTML.innerHTML = '<li class="carrito-vacio">El carrito está vacío por ahora.</li>';
        totalHTML.innerText = "$0.00";
        return; 
    }


    listaHTML.innerHTML = "";
    let totalPagar = 0;


    for (let i = 0; i < carrito.length; i++) {
     
        totalPagar = totalPagar + carrito[i].precio;

    
        let item = document.createElement("li");
        item.className = "item-carrito";
        item.innerHTML = `
            <span><strong>${carrito[i].nombre}</strong> - $${carrito[i].precio}</span>
            <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${i})">Eliminar</button>
        `;


        listaHTML.appendChild(item);
    }


    totalHTML.innerText = "$" + totalPagar.toFixed(2);
}

function eliminarDelCarrito(posicion) {

    carrito.splice(posicion, 1);

    actualizarCarrito();
}


function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    carrito = [];
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algún manga antes de pagar.");
    } else {
        alert("🎉 ¡Muchas gracias por tu compra! Tu pedido de mangas está en preparación.");
    
        carrito = [];
        actualizarCarrito();
        cerrarModalCarrito();
    }
}


function abrirModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    modal.style.display = "flex";
}

function cerrarModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    modal.style.display = "none";
}


function filtrarMangas(categoriaSeleccionada, botonClickeado) {
    
    let tarjetas = document.querySelectorAll(".manga-card");

   
    let botones = document.querySelectorAll(".btn-filtro");
    for (let i = 0; i < botones.length; i++) {
        botones[i].classList.remove("activo");
    }
   
    botonClickeado.classList.add("activo");

    
    for (let i = 0; i < tarjetas.length; i++) {
        let categoriaManga = tarjetas[i].getAttribute("data-categoria");

        
        if (categoriaSeleccionada === "todos" || categoriaManga === categoriaSeleccionada) {
            tarjetas[i].style.display = "flex";
        } else {
            tarjetas[i].style.display = "none";
        }
    }
}


function mostrarNotificacion() {
    let notificacion = document.getElementById("notificacion");
    notificacion.classList.add("mostrar");

   
    setTimeout(function() {
        notificacion.classList.remove("mostrar");
    }, 2500);
}