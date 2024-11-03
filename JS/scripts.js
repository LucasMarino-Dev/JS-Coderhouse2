let arrayProductos = []


fetch("../DB/data.JSON")
    .then(response => response.json())
    .then(data => {
        arrayProductos = data,
        renderProductos(arrayProductos)
    })
    .catch(error => console.error("Error al cargar productos", error))


let productos = document.getElementById("productos")

function renderProductos(arrayProductos) {
    arrayProductos.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "productos"
        contenedor.innerHTML = `<img src="${producto.img}" alt="${producto.nombre}">
                                <div class = "productos-elementos">
                                <h5>${producto.nombre}</h5>
                                <p> Color: ${producto.color}</p>
                                <p> Marca: ${producto.marca}</p>
                                <p> Precio: $${producto.precio}</p>
                                <button class="btn-agregar-productos" id="${producto.id}"> Agregar al carrito </button>
                                </div>`
        productos.appendChild(contenedor)
        agregarProducto()
    })
}


//CARRITO

let carrito = []

function agregarProducto () { 
    const btnAgregarProducto = document.querySelectorAll(".btn-agregar-productos")
    btnAgregarProducto.forEach((btn) => {
        btn.onclick = (e) => {
            const productoID = parseInt(e.currentTarget.id)
            const productoSeleccionado = arrayProductos.find((producto) => producto.id === productoID)
            const productoEnCarrito = carrito.find((producto) => producto.id === productoID)
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++
            } else {
                carrito.push({...productoSeleccionado})
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
    }
)
}

