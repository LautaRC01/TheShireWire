/* ====================  L • R • C |  2 0 2 5  ==================== */



document.addEventListener("DOMContentLoaded", () => {




const textarea = document.getElementById("content");
const newPostBtn = document.getElementById("openModalBtn");
const closeButton = document.getElementById("closeModalBtn");
const postsContainer = document.querySelector(".posts-container");
const modalOverlay = document.getElementById("modalOverlay");




//NEW POST MODAL//

const openBtn = document.getElementById("openModalBtn");
const overlay  = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("modal");

if (!openBtn || !overlay || !closeBtn) return;

    
  openBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
  });

    
  closeBtn.addEventListener("click", () => {
      overlay.classList.add("hidden");
   });

  // Cerrar al clickear fuera
  overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
          overlay.classList.add("hidden");
      }
    }
);



//DELETE FUNCTION//   


if (postsContainer) {
  postsContainer.addEventListener("click", async (e) => {
    console.log("Click en postsContainer detectado");
    const btn = e.target.closest(".deleteButton");
    if (!btn) return;
    console.log("Botón delete encontrado:", btn);
    const postId = btn.dataset.id;
    console.log("El ID del post a borrar es:", postId);

    const ok = await customConfirm();
    if (!ok) return;

    try {
      const response = await fetch(`/posts/${postId}`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert("Error al borrar: " + (errorData.error || response.status));
        return;
      }

      const postElement = document.getElementById(`post-${postId}`);
      if (postElement) postElement.remove();
    } catch (err) {
      console.error("Fetch error:", err);
      alert("No se pudo conectar con el servidor.");
    }
  });
}



//DELETE CONFIRM MODAL//

function customConfirm() {
  return new Promise((resolve) => {

    const modal = document.getElementById("custom-confirm");
    const confirmBtn = document.getElementById("confirm-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    modal.classList.remove("hidden");

    confirmBtn.onclick = () => {
      modal.classList.add("hidden");
      resolve(true);
    };

    cancelBtn.onclick = () => {
      modal.classList.add("hidden");
      resolve(false);
    };
  });
}




//THEME SWITCHER//


const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector(".theme-icon");
const html = document.documentElement; // importante, NO body

// APLICAR MODO GUARDADO PREVIAMENTE//
const savedTheme = localStorage.getItem("themeMode");
if (savedTheme === "dark") {
    html.classList.add("darkMode");
    icon.textContent = "☀️";
}
//TOGGLE BUTTON//
toggleBtn.addEventListener("click", () => {
    html.classList.toggle("darkMode");

    const isDark = html.classList.contains("darkMode");

    icon.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("themeMode", isDark ? "dark" : "light");
});




//VINES&PARTICLES//

setInterval(() => {
    if (Math.random() < 0.6) createLeaf();  // probabilidad moderada
}, 2000); // cada 3s revisa si lanza o no una hoja


const leafImages = [
    "/img/particle-leaf1.png",
    "/img/particle-leaf2.png",
    "/img/particle-leaf3.png",
    "/img/particle-leaf4.png"
];

function createLeaf() {
    const leaf = document.createElement("img");
    leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.classList.add("falling-leaf");

    // tamaño aleatorio
    const size = Math.random() * 12 + 20; // entre 20 y 32px
    leaf.style.width = size + "px";

    // Aparecen SOLO en los costados
    if (Math.random() < 0.5) {
    // Lado izquierdo (ajustá 0–10vw a gusto)
    leaf.style.left = (Math.random() * 20) + "vw";
    } else {
    // Lado derecho (ajustá 90–100vw a gusto)
    leaf.style.left = (80 + Math.random() * 10) + "vw";
    }

    // altura inicial (ACA AJUSTÁS para que NO salgan desde el header)
    leaf.style.top = (200 + Math.random() * 100) + "px";

    // rotación inicial custom property
    const rot = Math.floor(Math.random() * 360) + "deg";
    leaf.style.setProperty("--rot-start", rot);

    // duración de la caída
    const duration = Math.random() * 6 + 8; // 8–14s
    leaf.style.animationDuration = duration + "s";

    document.body.appendChild(leaf);

    setTimeout(() => leaf.remove(), duration * 1000);
    }

    // INTERVALO DE PARTICULAS.. AJUSTAR A GUSTO
    setInterval(createLeaf, 800 + Math.random() * 1600);



    const elvenDividerTop = document.getElementsByClassName("elven-divider-top");
    




});