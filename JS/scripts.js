let auriculares = [
    {
        nombre: "Auriculares ejemplo 1",
        color: "negros",
        marca: "JBL",
        precio: 15000,
        id: 1,
        cantidad: 1,
        img: "../images/auriculares-ejemplo-1.jpg"
    },
    {
        nombre: "Auriculares ejemplo 2",
        color: "negros",
        marca: "Xiaomi",
        precio: 18000,
        cantidad: 1, 
        id: 2,
        img: "../images/auriculares-ejemplo-2.jpg"
    },
    {
        nombre: "Auriculares ejemplo 3",
        color: "negros",
        marca: "JBL",
        precio: 30000,
        cantidad: 1,
        id: 3,
        img: "../images/auriculares-ejemplo-3.jpg"
    }
] 

let cargadores = [
    {
        nombre: "Cargador ejemplo 1",
        color: "blanco",
        marca: "Samsung",
        precio: 10000,
        cantidad: 1,
        id: 4, 
        img: "../images/cargador-ejemplo-1.jpg"
    },
    {
        nombre: "Cargador ejemplo 2",
        color: "blanco",
        marca: "Gadnic",
        precio: 20000,
        cantidad: 1,
        id: 5, 
        img: "../images/cargador-ejemplo-2.jpg"
    },
    {
        nombre: "Cargador ejemplo 3",
        color: "Negro",
        marca: "Universal",
        precio: 17000,
        cantidad: 1,
        id: 6, 
        img: "../images/cargador-ejemplo-3.jpg"
    }
]

let fundas = [
    {
        nombre: "Funda ejemplo 1",
        color: "Negro",
        marca: "Iphone 11",
        precio: 10000,
        cantidad: 1,
        id: 7, 
        img: "../images/funda-ejemplo-1.jpg"
    },
    {
        nombre: "Funda ejemplo 2",
        color: "Noche estrellada",
        marca: "Iphone X",
        precio: 12000,
        cantidad: 1, 
        id: 8, 
        img: "../images/funda-ejemplo-2.jpg"
    },
    {
        nombre: "Funda ejemplo 3",
        color: "Seleccionar",
        marca: "Samsung",
        precio: 8000,
        cantidad: 1,
        id: 9, 
        img: "../images/funda-ejemplo-3.jpg"
    }
]


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

renderProductos(auriculares)
renderProductos(cargadores)
renderProductos(fundas)

//CARRITO

let carrito = []

function agregarProducto () { 
    const btnAgregarProducto = document.querySelectorAll(".btn-agregar-productos")
    btnAgregarProducto.forEach((btn) => {
        btn.onclick = (e) => {
            const productoID = parseInt(e.currentTarget.id)
            const productoSeleccionado = [...auriculares, ...cargadores, ...fundas].find((producto) => producto.id === productoID)
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

