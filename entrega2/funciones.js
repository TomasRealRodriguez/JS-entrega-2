const Carta = document.getElementById("Carta");
const Carrito = document.getElementById("Carrito");
const BotonAgregar = document.getElementById("BotonAgregar");

let Compras = [];

async function MostrarMenu() {
    try {
        const datosMenu = await fetch('datos.json');
        if (!datosMenu.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const Menu = await datosMenu.json();

        Menu.forEach((el) => {
            Carta.innerHTML += `<div id="${el.id}">
                <h3>${el.nombre}</h3>
                <p>$${el.precio}</p>
                <img src="${el.img}" alt="${el.nombre}"/>
                <button class="agregarCarrito">Agregar al pedido</button>
            </div>`;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

MostrarMenu();

function agregarCarrito() {
    Carrito.innerHTML = '';
    Compras.forEach(el => {
        Carrito.innerHTML +=
            `<div id="${el.id}">
                <p>
                    <button class="carritoMas">+</button>
                    ${el.cantidad}
                    <button class="carritoMenos">-</button>
                </p>
                <p>${el.nombre}</p>
                <p>${el.precio}</p>
            </div>`;
    });

    Carrito.innerHTML += `<p>Total: $${calcularMontoTotal()}</p>`;
}

function calcularMontoTotal() {
    return Compras.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0).toFixed(2);
}

function limpiadora() {
    Carrito.innerHTML = '';
}

Carta.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregarCarrito")) {
        const producto = e.target.parentElement;
        const productoAgregado = {
            id: producto.id,
            cantidad: 1,
            nombre: producto.querySelector("h3").textContent,
            precio: parseFloat(producto.querySelector("p").textContent.replace('$', '')),
        };

        Swal.fire({
            title: "¡Agregado al pedido!",
            imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm5jdHl3cm5wN3IxcGdzMHl5bDJydW1mYzk4ajR3MzFrNHdiMHBxaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b5Hcaz7EPz26I/giphy.webp",
            toast: true,
            showConfirmButton: false,
            position: 'bottom-end',
            timerProgressBar: true,
            timer: 3000,
        });

        const index = Compras.findIndex(p => p.id === productoAgregado.id);
        if (index === -1) {
            Compras.push(productoAgregado);
        } else {
            Compras[index].cantidad += 1;
        }

        console.log(Compras);
    }
});

Carrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("carritoMas")) {
        const id = e.target.parentElement.parentElement.id;
        const index = Compras.findIndex(p => p.id === id);
        if (index !== -1) {
            Compras[index].cantidad += 1;
        }
    } else if (e.target.classList.contains("carritoMenos")) {
        const id = e.target.parentElement.parentElement.id;
        const index = Compras.findIndex(p => p.id === id);
        if (index !== -1) {
            Compras[index].cantidad -= 1;
            if (Compras[index].cantidad <= 0) {
                Compras.splice(index, 1);
            }
        }
    }

    agregarCarrito();
    localStorage.setItem("carrito", JSON.stringify(Compras));
});

function datosEnvio(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    const datos = {
        nombre: nombre,
        email: email
    };

    Swal.fire({
        title: "¡Pedido despachado!",
        text: "En instantes te llegara un correo con los detalles de tu pedido",
        confirmButtonText: "¡Genial!",
        confirmButtonColor: "#45a049",
        imageUrl: "https://media1.tenor.com/m/U_B0aizw05UAAAAd/sanji-sanji-vin-smoke.gif",
    });

    const datosJSON = JSON.stringify(datos);
    localStorage.setItem('datosEnvio', datosJSON);
}

BotonAgregar.addEventListener("click", () => {
    limpiadora();
    agregarCarrito();
    localStorage.setItem("carrito", JSON.stringify(Compras));
});

document.getElementById("submit").addEventListener("click", datosEnvio);
