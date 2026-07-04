/* Filters project cards on /referenzen by data-category, driven by [data-filter] buttons */

document.addEventListener("DOMContentLoaded", () => {
  const filterBar = document.querySelector("[data-filter-bar]");
  const cards = document.querySelectorAll("[data-project-card]");
  if (!filterBar || !cards.length) return;

  const buttons = filterBar.querySelectorAll("[data-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      buttons.forEach((b) => {
        const active = b === button;
        b.setAttribute("aria-pressed", String(active));
        b.classList.toggle("is-active", active);
      });

      cards.forEach((card) => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const show = filter === "alle" || categories.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });
});
