document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ NombreUsuario: username, Contrasena: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("authToken", data.token); // Guarda el token en localStorage
          window.location.href = "libros.html"; // Redirige a libros.html
        } else {
          document.getElementById("error-message").style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("error-message").style.display = "block";
      });
  });
});
