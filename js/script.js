document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.getElementById("loginA");
    const modal = document.getElementById("modal");
    const loginForm = document.getElementById("loginForm");
  
    // Muestra el modal al hacer clic en el enlace
    loginLink.addEventListener("click", (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado del enlace
      modal.classList.add("visible");
    });
  
    // Oculta el modal al hacer clic fuera del contenido
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("visible");
      }
    });
  
    // Maneja el envío del formulario
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que el formulario se envíe por defecto
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Verifica las credenciales
      if (username === "usuario" && password === "contrasenia") {
        window.location.href = "IndexAdmin.html"; // Redirige a la página
      } else {
        alert("Usuario o contraseña incorrectos"); // Muestra un mensaje de error
      }
    });
  });
  