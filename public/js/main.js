/* ====================  L • R • C |  2 0 2 5  ==================== */

document.addEventListener("DOMContentLoaded", () => {

const textarea = document.getElementById("content");
const newPostBtn = document.getElementById("openModalBtn");
const closeButton = document.getElementById("closeModalBtn");
const postsContainer = document.querySelector(".posts-container");
const modalOverlay = document.getElementById("modalOverlay");

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


});

//NEW POST MODAL//

document.addEventListener("DOMContentLoaded", () => {

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
    });

});






// ===============================
// THEME MANAGER
// ===============================

// Aplicar tema guardado al cargar
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    // Botones
    const dayBtn = document.getElementById("themeDay");
    const twiBtn = document.getElementById("themeTwilight");
    const nightBtn = document.getElementById("themeNight");

    const setTheme = (theme) => {
        // Limpia todo
        document.body.classList.remove("day", "twilight", "night");

        if (theme !== "day") {
            document.body.classList.add(theme);
        }

        localStorage.setItem("theme", theme);
    };

    dayBtn.onclick = () => setTheme("day");
    twiBtn.onclick = () => setTheme("twilight");
    nightBtn.onclick = () => setTheme("night");
});



