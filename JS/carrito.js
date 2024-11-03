let carritoContainer = document.getElementById("carrito-productos")
let elementosHTMLCarrito = document.getElementsByClassName ("elementos-carrito")
let carritoResumen = document.getElementById("carrito-resumen")

let carritoStorage = localStorage.getItem("carrito")
carritoStorage= JSON.parse(carritoStorage) || []


function renderProductos(elementosCarrito) {
    carritoContainer.innerHTML = ""
    carritoContainer.innerHTML = "<h3>Tu Carrito: </h3>"
    elementosCarrito.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "productosAgregados"
        contenedor.innerHTML = `<img src="${producto.img}" alt="${producto.nombre}">
                                <div class = "productosAgregados-elementos">
                                <h5>${producto.nombre}</h5>
                                <p> Color: ${producto.color}</p>
                                <p> Marca: ${producto.marca}</p>
                                <p> Precio: $${producto.precio}</p>
                                <div class="contador-productos">
                                <button class="btn-decrementar-productos" id="${producto.id}"> - </button>
                                <span class="contador-productos-span"> ${producto.cantidad} </span>
                                <button class="btn-incrementar-productos" id="${producto.id}"> + </button>
                                </div>
                                <button class="btn-eliminar-productos" id="${producto.id}"> Eliminar </button>
                                </div>`
        carritoContainer.appendChild(contenedor)
    })
    eliminarProducto()
    incrementarContador()
    decrementarContador()
    renderResumen(elementosCarrito)
    sumaTotal(elementosCarrito)
}

if (carritoStorage.length > 0) {
    renderProductos(carritoStorage)
}

//ELIMINAR PRODUCTO

function eliminarProducto () {
    const btnEliminarProducto = document.querySelectorAll(".btn-eliminar-productos")
    btnEliminarProducto.forEach((btn) => {
        btn.onclick = (e) => {
            const productoID = parseInt(e.currentTarget.id)
            const productoEliminado = carritoStorage.findIndex((producto) => producto.id === productoID)
            carritoStorage.splice(productoEliminado, 1)
            localStorage.setItem("carrito", JSON.stringify(carritoStorage))
            renderProductos(carritoStorage)
        }
    })
}

//INCREMENTAR CONTADOR

function incrementarContador () {
    const btnIncrementarProducto = document.querySelectorAll(".btn-incrementar-productos")
    btnIncrementarProducto.forEach((btn) => {
        btn.onclick = (e) => {
            const productoID = parseInt(e.currentTarget.id)
            const productoIncrementado = carritoStorage.find((producto) => producto.id === productoID)
            productoIncrementado.cantidad++
            localStorage.setItem("carrito", JSON.stringify(carritoStorage))
            renderProductos(carritoStorage)
        }
    })
}

function decrementarContador () {
    const btnDecrementarProducto = document.querySelectorAll(".btn-decrementar-productos")
    btnDecrementarProducto.forEach((btn) => {
        btn.onclick = (e) => {
            const productoID = parseInt(e.currentTarget.id)
            const productoDecrementado = carritoStorage.find((producto) => producto.id === productoID)
            if (productoDecrementado.cantidad > 1) {
                productoDecrementado.cantidad--
                localStorage.setItem("carrito", JSON.stringify(carritoStorage))
                renderProductos(carritoStorage)
            } else {}
        }
    })
}

//RESUMEN DE COMPRA 

function sumaTotal (elementosCarrito) {
    let total =  elementosCarrito.reduce((acumulador, producto) => 
    acumulador + producto.cantidad * producto.precio, 0)
    const carritoTotal = document.querySelector("#carrito-total span")
    carritoTotal.innerHTML = "Total: $" + total.toFixed(2) 
}


//DIALOG FINALIZAR COMPRA 
dialogFinalizarCompra = document.getElementById("dialog-finalizar-compra")
btnFinalizarCompra = document.getElementById("btn-finalizar-compra")
btnCerrarDialog = document.getElementById("btn-cerrar-dialog")

btnFinalizarCompra.addEventListener("click", () =>{
    dialogFinalizarCompra.showModal()
})
btnCerrarDialog.addEventListener("click", () =>{
    dialogFinalizarCompra.close()
})

//CHEKERS COMPRADOR
const telefonoInput = document.getElementById("telefono-dialog-finalizar-compra")
telefonoInput.addEventListener("input", () =>{
    telefonoInput.value = telefonoInput.value.replace(/[^0-9]/g, "")
})

const inputContainerFinalizarCompra = document.getElementById("input-container-finalizar-compra")
const btnComprar = document.getElementById("btn-comprar")
const mensajeError = document.getElementById("mensaje-error")
const datosComprador = document.getElementById("datos-comprador")

function validarFormulario () {
    const telefonoValido = telefonoInput.value.length === 10
    const datosValidos = datosComprador.checkValidity()

    btnComprar.disabled = !(telefonoValido && datosValidos)
}

datosComprador.addEventListener("input", validarFormulario) 

btnComprar.onclick = () => {
    Swal.fire({
        title: "¡Gracias por comprar con nosotros!",
        text: "Te enviaremos un mensaje con tus datos de compra y opciones de metodos de pago",
        icon: "success"
    });
    localStorage.clear()
}



validarFormulario()

function renderResumen (elementosCarrito){
    carritoResumen.innerHTML = ""
    elementosCarrito.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "productosResumen"
        contenedor.innerHTML = `
                                <h5> ${producto.nombre} </h5>
                                <p> Precio: ${producto.precio} </p>
                                <p> Cantidad: ${producto.cantidad} </p>
                                `
    carritoResumen.appendChild(contenedor)
    })

}

renderResumen(carritoStorage)