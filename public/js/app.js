document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalExcluir");
  if (!modal) return;
  modal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const id = button.getAttribute("data-oficina-id");
    const titulo = button.getAttribute("data-oficina-titulo");
    document.getElementById("nomeOficinaExcluir").textContent = titulo;
    document.getElementById("formExcluir").action = `/oficinas/${id}/excluir`;
  });
});
