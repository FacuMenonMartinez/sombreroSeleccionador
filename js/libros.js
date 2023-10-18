let contenedorLibros = document.getElementById("contenedorLibros");


fetch("../../js/productos.json")
.then((response)=> response.json())
.then((producto)=>{
    let libros = producto.filter(libro=> libro.tipo==="libro");

    libros.forEach(item=>{
        let section = document.createElement("section");
        section.classList.add("reseñaLibros");
        section.innerHTML=`
        <div>
        <h2>${item.titulo}</h2>
        <p>${item.descripcion}</p>
        <button class="boton" id="agregarCarrito${item.id}">Agregar al carrito</button>
        </div>
        <img src="${item.img}">`

        contenedorLibros.append(section)
    })
    
})

