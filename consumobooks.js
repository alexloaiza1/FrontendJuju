document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("authToken"); // Captura el token del localStorage

  if (!token) {
    console.error("No se encontró el token de autenticación.");
    return;
  }

  // Función para obtener y mostrar los libros
  function fetchBooks() {
    fetch("http://localhost:3000/api/books", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#books-table tbody");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de llenarla
        data.forEach((book) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${book.LibroID}</td>
            <td>${book.Titulo}</td>
            <td>${book.Autor}</td>
            <td>${book.AnioPublicacion}</td>
            <td>${book.Estado}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  // Llamar a la función para obtener y mostrar los libros al cargar la página
  fetchBooks();

  // Manejar el envío del formulario para agregar un nuevo libro
  const addBookForm = document.getElementById("add-book-form");
  addBookForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = document.getElementById("anio").value;
    const estado = document.getElementById("estado").value;
    const userid = parseInt(document.getElementById("userid").value, 10);

    fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo, autor, anio, estado, userid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Libro agregado:", data);
        fetchBooks(); // Actualizar la lista de libros
        addBookForm.reset(); // Limpiar el formulario
      })
      .catch((error) => console.error("Error:", error));
  });
});
