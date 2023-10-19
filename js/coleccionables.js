const contenedorColeccionables = document.getElementById("contenedorProductos");


let productosCompletos = [];


const renderizarProductos = (arrayDeProductos) => {

    contenedorColeccionables.innerHTML = " ";

    arrayDeProductos.forEach(item => {
        let tarjetaProducto = document.createElement('article');
        tarjetaProducto.classList.add('tarjetaProducto');
        tarjetaProducto.innerHTML = `
        <h4>${item.producto}</h4>
        <img src=${item.img}></img>
        <p>$ ${item.precio}</p>        
        `
        contenedorColeccionables.append(tarjetaProducto);

    })


}


// LLAMADA A API
fetch("../../js/productos.json")
    .then(res => res.json())
    .then((data) => {
        let coleccionables = data.filter(item => item.tipo === "coleccionable");
        productosCompletos = coleccionables.sort(function(a,b){
            return a.id - b.id
        });

        renderizarProductos(coleccionables);


    });





// FILTROS
const contenedorFiltro = document.getElementById("contenedorFiltro");
const botonMostrarFiltros = document.getElementById("botonMostrarFiltros");
const filtroProductos = document.getElementById("filtroProductos");
const checkVarita = document.getElementById("filtroVarita");
const checkRopa = document.getElementById("filtroRopa");
const checkLibreria = document.getElementById("filtroLibreria");
const checkOtro = document.getElementById("filtroOtro");
const botonLimpiarFiltro = document.getElementById("botonLimpiarFiltro");

botonMostrarFiltros.addEventListener('click',()=>{
    contenedorFiltro.classList.toggle('mostrarFiltro');
    contenedorFiltro.classList.toggle('contenedorFiltro');

})

function filtrarProductos(filtro) {
    const productosFiltrados = productosCompletos.filter(item => item.filtro === filtro);
    renderizarProductos(productosFiltrados);
}

checkVarita.addEventListener('change', (e) => {
    if (checkVarita.checked) {

        checkRopa.checked = false;
        checkLibreria.checked = false;
        checkOtro.checked = false;

        filtrarProductos(e.target.value);
    } else {
        renderizarProductos(productosCompletos);
    }
});

checkRopa.addEventListener('change', (e) => {
    if (checkRopa.checked) {

        checkVarita.checked = false;
        checkLibreria.checked = false;
        checkOtro.checked = false;

        filtrarProductos(e.target.value);
    } else {
        renderizarProductos(productosCompletos);
    }
});

checkLibreria.addEventListener('change', (e) => {
    if (checkLibreria.checked) {

        checkRopa.checked = false;
        checkVarita.checked = false;
        checkOtro.checked = false;

        filtrarProductos(e.target.value);

    } else {
        renderizarProductos(productosCompletos);
    }
});

checkOtro.addEventListener('change', (e) => {
    if (checkOtro.checked) {

        checkRopa.checked = false;
        checkLibreria.checked = false;
        checkVarita.checked = false;

        filtrarProductos(e.target.value);
    } else {
        renderizarProductos(productosCompletos);
    }
});

botonLimpiarFiltro.addEventListener('click', (e) => {
    e.preventDefault();
    checkRopa.checked = false;
    checkLibreria.checked = false;
    checkVarita.checked = false;
    checkOtro.checked = false;

    renderizarProductos(productosCompletos);

})




// ORDEN DE PRODUCTOS
const orden = document.getElementById("orden");

orden.addEventListener('change', (e) => {
    let ordenElegido = e.target.value;

    switch (ordenElegido) {
        case "menorPrecio":
            productosCompletos.sort(function (a, b) {
                return a.precio - b.precio
            });
            renderizarProductos(productosCompletos);
            break;

        case "mayorPrecio":
            productosCompletos.sort(function (a, b) {
                return b.precio - a.precio
            });
            renderizarProductos(productosCompletos);
            break;

        case "abcAscendente":
            productosCompletos.sort(function (a, b) {
                if (a.producto > b.producto) {
                    return 1
                }
                if (a.producto < b.producto) {
                    return -1
                }
            })
            renderizarProductos(productosCompletos);
            break;

        case "abcDescendente":
            productosCompletos.sort(function (a, b) {
                if (a.producto < b.producto) {
                    return 1
                }
                if (a.producto > b.producto) {
                    return -1
                }
            })
            renderizarProductos(productosCompletos);
            break;
        default:
            renderizarProductos(productosCompletos);
            break;

    }

})



