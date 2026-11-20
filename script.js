// ========================================================
// PROYECTO TIENDA DE MANGAS - JAVASCRIPT BÁSICO (2° SEMESTRE)
// ========================================================

// 1. VARIABLES GLOBALES
// Un arreglo (array) para almacenar los mangas que el usuario agregue
let carrito = [];

// 2. FUNCIÓN: AGREGAR UN MANGA AL CARRITO
// Recibe como parámetros el título del manga y su precio
function agregarAlCarrito(nombre, precio) {
    // Creamos un objeto simple con la información del producto
    let producto = {
        nombre: nombre,
        precio: precio
    };

    // Agregamos el producto a la lista con push()
    carrito.push(producto);

    // Actualizamos la pantalla (contador, total y lista)
    actualizarCarrito();

    // Mostramos un mensaje visual de que se agregó
    mostrarNotificacion();
}

// 3. FUNCIÓN: ACTUALIZAR EL CARRITO EN PANTALLA
function actualizarCarrito() {
    let listaHTML = document.getElementById("lista-carrito");
    let contadorHTML = document.getElementById("contador-carrito");
    let totalHTML = document.getElementById("total-precio");

    // Actualizamos el número del contador en la barra de navegación
    contadorHTML.innerText = carrito.length;

    // Si el carrito está vacío, mostramos un mensaje por defecto
    if (carrito.length === 0) {
        listaHTML.innerHTML = '<li class="carrito-vacio">El carrito está vacío por ahora.</li>';
        totalHTML.innerText = "$0.00";
        return; // Terminamos la función aquí
    }

    // Limpiamos la lista para volver a llenarla
    listaHTML.innerHTML = "";
    let totalPagar = 0;

    // Recorremos el arreglo con un ciclo for tradicional (fácil de entender)
    for (let i = 0; i < carrito.length; i++) {
        // Sumamos el precio al total
        totalPagar = totalPagar + carrito[i].precio;

        // Creamos un elemento <li> para cada manga
        let item = document.createElement("li");
        item.className = "item-carrito";
        item.innerHTML = `
            <span><strong>${carrito[i].nombre}</strong> - $${carrito[i].precio}</span>
            <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${i})">Eliminar</button>
        `;

        // Lo agregamos a la lista
        listaHTML.appendChild(item);
    }

    // Mostramos el total con 2 decimales
    totalHTML.innerText = "$" + totalPagar.toFixed(2);
}

// 4. FUNCIÓN: ELIMINAR UN ELEMENTO ESPECÍFICO DEL CARRITO
function eliminarDelCarrito(posicion) {
    // splice elimina 1 elemento en la posición indicada
    carrito.splice(posicion, 1);
    
    // Volvemos a actualizar la vista
    actualizarCarrito();
}

// 5. FUNCIÓN: VACIAR TODO EL CARRITO
function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    // Reiniciamos el arreglo dejándolo vacío
    carrito = [];
    actualizarCarrito();
}

// 6. FUNCIÓN: FINALIZAR LA COMPRA
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algún manga antes de pagar.");
    } else {
        alert("🎉 ¡Muchas gracias por tu compra! Tu pedido de mangas está en preparación.");
        // Vaciamos el carrito tras comprar
        carrito = [];
        actualizarCarrito();
        cerrarModalCarrito();
    }
}

// 7. FUNCIONES PARA ABRIR Y CERRAR LA VENTANA (MODAL) DEL CARRITO
function abrirModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    modal.style.display = "flex";
}

function cerrarModalCarrito() {
    let modal = document.getElementById("modal-carrito");
    modal.style.display = "none";
}

// 8. FUNCIÓN: FILTRAR MANGAS POR CATEGORÍA
function filtrarMangas(categoriaSeleccionada, botonClickeado) {
    // Obtenemos todas las tarjetas de mangas
    let tarjetas = document.querySelectorAll(".manga-card");

    // Quitamos la clase 'activo' de todos los botones de filtro
    let botones = document.querySelectorAll(".btn-filtro");
    for (let i = 0; i < botones.length; i++) {
        botones[i].classList.remove("activo");
    }
    // Ponemos como activo el botón al que se le hizo clic
    botonClickeado.classList.add("activo");

    // Revisamos cada tarjeta con un ciclo for
    for (let i = 0; i < tarjetas.length; i++) {
        let categoriaManga = tarjetas[i].getAttribute("data-categoria");

        // Si la categoría es 'todos' o coincide con la del manga, la mostramos
        if (categoriaSeleccionada === "todos" || categoriaManga === categoriaSeleccionada) {
            tarjetas[i].style.display = "flex";
        } else {
            tarjetas[i].style.display = "none";
        }
    }
}

// 9. FUNCIÓN: MENSAJE TEMPORAL (TOAST) AL AÑADIR
function mostrarNotificacion() {
    let notificacion = document.getElementById("notificacion");
    notificacion.classList.add("mostrar");

    // Ocultar la notificación después de 2.5 segundos (2500 ms)
    setTimeout(function() {
        notificacion.classList.remove("mostrar");
    }, 2500);
}}