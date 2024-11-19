let url = 'https://6374cbe848dfab73a4e9263f.mockapi.io/apiCarrito/carrito';
let carrito;
let total = -1000;
let cantElementosDefault = 2;

function validarInput(event) {
    //Solo se permite ingresar enteros positivos dado que es una cantidad.
    if (/[^0-9]/g.test(event.key))
        event.preventDefault();
}

async function borrarElemento(event) {
    if (carrito.length == cantElementosDefault + 1)
        borrarPedido();
    else {
        let button = event.target;
        let response = await fetch(url + "/" + button.idproducto);
        let producto = await response.json();

        total -= parseInt(producto.precio);

        await fetch(url + "/" + producto.id, { 'method': 'DELETE' });
        await precargarTabla();
    }
}

async function editarObservaciones(event) {
    if (event.key == "Enter") {
        let txtObservaciones = event.target;

        let response = await fetch(url + "/" + txtObservaciones.id);
        let producto = await response.json();

        producto.observaciones = txtObservaciones.value;

        await fetch(url + "/" + producto.id, {
            'method': 'PUT',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(producto)
        });

        await precargarTabla();
    }
}

async function insertarRegistro() {
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let mensaje = document.getElementById('mensaje');
    //controlamos que no se ingresen más de 10 artículos
    if (carrito.length + cantidad > 10) {
        mensaje.innerHTML = "La cantidad máxima de elementos es 10";
        return;
    }

    mensaje.innerHTML = "";

    let articulo = document.getElementById('articulo');
    let nombreArticulo = articulo.options[articulo.selectedIndex].text;
    let precio = articulo.options[articulo.selectedIndex].value;
    let producto = {
        "producto": nombreArticulo,
        "observaciones": "",
        "precio": precio
    }

    for (let i = 0; i < cantidad; i++) {
        await fetch(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(producto)
        });
        total += parseInt(precio);
    }

    await precargarTabla();
}

async function borrarPedido() {
    document.getElementById('mensaje').innerHTML = "";
    await obtenerDatos();
    for (let i = 0; i < carrito.length; i++)
        await fetch(url + "/" + carrito[i].id, { 'method': 'DELETE' });

    total = -1000;
    carrito = [
        {
            "id": "1",
            "producto": "Envio",
            "observaciones": "",
            "precio": "0"
        },
        {
            "id": "2",
            "producto": "Descuento día de la madre",
            "observaciones": "",
            "precio": "-1000"
        }
    ];

    for (let i = 0; i < carrito.length; i++)
        await fetch(url, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(carrito[i])
        });

    precargarTabla();
}

async function precargarTabla() {
    await obtenerDatos();
    let table = document.getElementById('listaProductos');
    table.innerHTML = "<tr><th>Producto</th><th>Precio</th><th>Acción</th></tr>";

    if (carrito.length > cantElementosDefault)
        table.innerHTML = "<tr><th>Producto</th><th>Precio</th><th>Observaciones</th><th>Acción</th></tr>";
    else
        table.innerHTML = "<tr><th>Producto</th><th>Precio</th></tr>";

    for (let i = cantElementosDefault; i < carrito.length; i++)
        table.innerHTML += "<tr><td>" + carrito[i].producto + "</td><td>" + (carrito[i].precio >= 0 ? "$" : "-$") +
            Math.abs(carrito[i].precio) + "</td>" + '<td><input type="text" id="' + carrito[i].id +
            '" value="' + carrito[i].observaciones + '" onkeypress="editarObservaciones(event)"></td>' +
            '<td><button idproducto="' + carrito[i].id +
            '"type="button" onclick="borrarElemento(event)">Borrar</button></td></tr>'

    for (let i = 0; i < cantElementosDefault; i++)
        table.innerHTML += "<tr><td>" + carrito[i].producto + "</td><td>" + (carrito[i].precio >= 0 ? "$" : "-$") +
            Math.abs(carrito[i].precio) + "</td></tr>"

    if (carrito.length > cantElementosDefault)
        table.innerHTML += "<tr><td>Total</td><td>$" + total + "</td></tr>"
}

async function obtenerDatos() {
    try {
        let response = await fetch(url);
        carrito = await response.json();
    } catch (error) {
        console.log(error);
    }
}