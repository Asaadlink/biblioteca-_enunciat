// MINI BIBLIOTECA
const biblioteca = JSON.parse(localStorage.getItem("biblioteca")) || [
    { titulo: "Guerra y Paz", autor: "Lev Tolstoi", categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Anna Karenina", autor: "Lev Tolstoi", categoria: "drama", idioma: "català", epoca: "s.XIX" },
    { titulo: "L'Odisea", autor: "Homero", categoria: "drama", idioma: "català", epoca: "clásica" },
    { titulo: "Antologia de la poesia medieval catalana", autor: "Diversos", categoria: "poesia", idioma: "català", epoca: "clásica" },
    { titulo: "La Ilíada", autor: "Homero", categoria: "drama", idioma: "español", epoca: "clásica" },
    { titulo: "Poema del Mio Cid", autor: "Anónimo", categoria: "poesia", idioma: "español", epoca: "clásica" },
    { titulo: "Veinte mil leguas de viaje submarino", autor: "Jules Verne", categoria: "aventuras", idioma: "español", epoca: "s.XIX" },
    { titulo: "De la Terra a la Lluna", autor: "Jules Verne", categoria: "aventuras", idioma: "català", epoca: "s.XIX" },
    { titulo: "Cinco semanas en globo", autor: "Jules Verne", categoria: "aventuras", idioma: "español", epoca: "s.XIX" },
    { titulo: "Robinson Crusoe", autor: "Daniel Defoe", categoria: "aventuras", idioma: "català", epoca: "clásica" },
    { titulo: "Germinal", autor: 'Émile Zola', categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Notre Dame de Paris", autor: 'Victor Hugo', categoria: "drama", idioma: "català", epoca: "s.XIX" },
    { titulo: "Los Miserables", autor: 'Victor Hugo', categoria: "drama", idioma: "español", epoca: "s.XIX" },
    { titulo: "Yo, robot", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Fundació", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "Ciberiada", autor: "Stanislaw Lem", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Solaris", autor: "Stanislaw Lem", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "El hombre bicentenario", autor: "Isaac Asimov", categoria: "ciencia-ficción", idioma: "español", epoca: "s.XX" },
    { titulo: "Tokio Blues", autor: "Haruki Murakami", categoria: "drama", idioma: "español", epoca: "s.XX" },
    { titulo: "Romancero Gitano", autor: "Federico García Lorca", categoria: "poesia", idioma: "español", epoca: "s.XX" },
    { titulo: "Los aventuras de Sherlock Holmes", autor: 'Arthur Conan Doyle', categoria: "misterio", idioma: "español", epoca: "s.XIX" },
    { titulo: "Rebelió a la granja", autor: 'George Orwell', categoria: "drama", idioma: "català", epoca: "s.XX" },
    { titulo: "La Divina Comedia", autor: "Dante Alighieri", categoria: "drama", idioma: "español", epoca: "clásica" },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
    { titulo: "Cròniques Marcianes", autor: "Ray Bradbury", categoria: "ciencia-ficción", idioma: "català", epoca: "s.XX" },
];

/// ==========================================================================================================
// EJERCICIO 1
// Libros disponibleS
// Mostrar la lista de obras alfabéticamente según el título, en forma de lista ordenada
// Llista del llibres
// const listaLibros = document.getElementById("listaLibros");

// Mostrar la lista de libros disponibles en orden alfabético 
function mostrarLibrosOrdenados() {
    const listaLibros = document.getElementById("listaLibros");
    listaLibros.innerHTML = ""; // Limpiar la lista

    const librosOrdenados = [...biblioteca].sort((a, b) => a.titulo.localeCompare(b.titulo));

    // Crear un elemento <li> para cada libro y añadirlo a la lista
    librosOrdenados.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor}`;
        listaLibros.appendChild(li);
    });
}

// Llamar a la función para mostrar la lista
mostrarLibrosOrdenados();

// ==========================================================================================================
// EJERCICIO 2
// Filtrar las obras según los criterios indicados en el formulario.
// Las obras que cumplan las condiciones se mostrarán dentro del div con id salidaFiltrada
// Las obras se mostrarán según aparece en la imagen modelo1.png
// Hay que aplicar algunos estilos que ya están definidos en el css

// Filtrar las obras según los criterios indicados en el formulario (categoría, idioma y época)
function filtrarObras() {
    // Obtener los valores seleccionados en los filtros
    const categoria = document.getElementById("categoria").value;
    const idioma = document.getElementById("idioma").value;
    const epoca = document.getElementById("epoca").value;

    const salidaFiltrada = document.getElementById("salidaFiltrada");
    salidaFiltrada.innerHTML = ""; 

    // Filtrar las obras que cumplan con los criterios seleccionados
    const obrasFiltradas = biblioteca.filter(libro => {
        return (
            (categoria === "" || libro.categoria === categoria) &&
            (idioma === "" || libro.idioma === idioma) &&
            (epoca === "" || libro.epoca === epoca)
        );
    });

    //Mostrar las obras filtradas o un mensaje si no hay coincidencias
    if (obrasFiltradas.length > 0) {
        obrasFiltradas.forEach(libro => {
            const div = document.createElement("div");
            div.className = "obra";
            div.textContent = `${libro.titulo} - ${libro.autor} (${libro.categoria}, idioma: ${libro.idioma}, época: ${libro.epoca})`;
            salidaFiltrada.appendChild(div);
        });
    } else {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se encontraron obras que coincidan con los criterios seleccionados.";
        salidaFiltrada.appendChild(mensaje);
    }
}

// ==========================================================================================================
// EJERCICIO 3
// Filtrar por autor
// Selección de obras según el nombre o parte del nombre de un autor.
// Al hacer clic sobre el botón buscar se mostrarán las obras cuyos autores cumplen los requisitos.
// La salida por pantalla será en este formato:
// Isaac Asimov : Yo, robot (ciencia-ficción, idioma : español, época : s.XX) 

// Buscar obras según el nombre o parte del nombre del autor
function filtrarPorAutor() {
    const autorInput = document.getElementById("autor").value.toLowerCase();
    const salidaAutor = document.getElementById("salidaAutor");
    salidaAutor.innerHTML = ""; // Limpiar resultados anteriores

    // Filtrar las obras cuyo autor coincida (parcial o totalmente) con el texto ingresado
    const obrasPorAutor = biblioteca.filter(libro => libro.autor.toLowerCase().includes(autorInput));

    // Mostrar las obras encontradas
    obrasPorAutor.forEach(libro => {
        const div = document.createElement("div");
        div.textContent = `${libro.autor} : ${libro.titulo} (${libro.categoria}, idioma: ${libro.idioma}, época: ${libro.epoca})`;
        salidaAutor.appendChild(div);
    });
}

// ==========================================================================================================
// EJERCICIO 4
// Añadir obra a la biblioteca
// A partir del formulario, añadir obras a la biblioteca
// Conseguir permanencia con LocalStorage
// Actualizar automáticamente el listado de obras del ejercicio 1

// A partir del formulario, añadir obras a la biblioteca y actualizar el listado automáticamente
function agregarObra() {
    // Obtener los valores ingresados en el formulario
    const titulo = document.getElementById("nuevoTitulo").value;
    const autor = document.getElementById("nuevoAutor").value;
    const categoria = document.getElementById("nuevaCategoria").value;
    const idioma = document.getElementById("nuevoIdioma").value;
    const epoca = document.getElementById("nuevaEpoca").value;

    const nuevaObra = { titulo, autor, categoria, idioma, epoca };
    biblioteca.push(nuevaObra);

    // Guardar la biblioteca actualizada en LocalStorage
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca));

    // Actualizar la lista de libros y mostrar un mensaje de éxito
    mostrarLibrosOrdenados();
    alert("Obra añadida correctamente.");
}

// ==========================================================================================================
// EJERCICIO 5
// Quitar obras de la biblioteca. Crea en un formulario una etiqueta select con las obras de la biblioteca.
// Al seleccionar una obra y enviar el formulario, se eliminará la obra de la biblioteca.
// Actualizar automáticamente el listado de obras del ejercicio 1
// Actualizar el LocalStorage

// Seleccionar una obra del formulario y eliminarla de la biblioteca
function eliminarObra() {
    const tituloSeleccionado = document.getElementById("selectObra").value;

    // Buscar el índice de la obra seleccionada
    const indice = biblioteca.findIndex(libro => libro.titulo === tituloSeleccionado);
    if (indice !== -1) {
        biblioteca.splice(indice, 1);
        localStorage.setItem("biblioteca", JSON.stringify(biblioteca));

        // Actualizar la lista de libros y el select
        mostrarLibrosOrdenados();
        actualizarSelectObras();
        alert("Obra eliminada correctamente.");
    }
}

// Actualizar el elemento <select> con las obras disponibles
function actualizarSelectObras() {
    const selectObra = document.getElementById("selectObra");
    selectObra.innerHTML = ""; 

    // Añadir una opción para cada obra en la biblioteca
    biblioteca.forEach(libro => {
        const option = document.createElement("option");
        option.value = libro.titulo;
        option.textContent = libro.titulo;
        selectObra.appendChild(option);
    });
}

// Llamar a esta función para actualizar el select al cargar la página
actualizarSelectObras();