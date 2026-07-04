/* Kontakt-Seite: reiner Auswahl-Flow (keine Texteingabe) - 2 Fragen, dann Calendly */

document.addEventListener("DOMContentLoaded", () => {
  const flow = document.querySelector("[data-contact-flow]");
  if (!flow) return;

  const steps = flow.querySelectorAll("[data-flow-step]");
  const progress = flow.querySelector("[data-flow-progress]");
  const next1 = flow.querySelector('[data-flow-next="1"]');
  const next2 = flow.querySelector('[data-flow-next="2"]');
  const back2 = flow.querySelector('[data-flow-back="2"]');

  goToStep(1);

  steps.forEach((step) => {
    const multiButtons = step.querySelectorAll("[data-flow-multi]");
    multiButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const pressed = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!pressed));
        button.classList.toggle("is-selected", !pressed);
        next1.disabled = step.querySelectorAll('[data-flow-multi][aria-pressed="true"]').length === 0;
      });
    });

    const singleButtons = step.querySelectorAll("[data-flow-single]");
    singleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        singleButtons.forEach((b) => {
          b.setAttribute("aria-pressed", "false");
          b.classList.remove("is-selected");
        });
        button.setAttribute("aria-pressed", "true");
        button.classList.add("is-selected");
        next2.disabled = false;
      });
    });
  });

  next1.addEventListener("click", () => goToStep(2));
  back2.addEventListener("click", () => goToStep(1));
  next2.addEventListener("click", () => goToStep(3));

  function goToStep(stepNumber) {
    steps.forEach((step) => {
      const isActive = Number(step.getAttribute("data-flow-step")) === stepNumber;
      step.classList.toggle("hidden", !isActive);
    });
    if (progress) {
      progress.classList.toggle("hidden", stepNumber === 3);
      progress.textContent = `Schritt ${stepNumber} von 2`;
    }
  }
});
