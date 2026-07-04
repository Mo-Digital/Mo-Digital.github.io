/* Multi-step contact form: 1) Leistung wählen  2) Kontaktdaten  3) Bestätigung + Calendly */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const steps = form.querySelectorAll("[data-step]");
  const serviceInput = form.querySelector("[data-service-input]");
  const serviceButtons = form.querySelectorAll("[data-service-option]");
  const step1Next = form.querySelector("[data-step1-next]");
  const step2Back = form.querySelector("[data-step2-back]");
  const errorBox = form.querySelector("[data-form-error]");
  const submitButton = form.querySelector("[data-form-submit]");

  goToStep(1);

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      serviceButtons.forEach((b) => b.classList.remove("is-selected"));
      button.classList.add("is-selected");
      serviceInput.value = button.getAttribute("data-service-option");
      step1Next.disabled = false;
    });
  });

  step1Next.addEventListener("click", () => goToStep(2));
  step2Back.addEventListener("click", () => goToStep(1));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    hideError();
    submitButton.disabled = true;
    submitButton.textContent = "Wird gesendet …";

    try {
      // TODO: Formular-Backend eintragen (z.B. Formspree-Endpoint als form action,
      // oder bei Netlify-Hosting: data-netlify="true" auf dem <form>-Tag setzen).
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submit failed");
      goToStep(3);
    } catch (err) {
      showError(
        "Das Absenden hat nicht geklappt. Bitte versuch es erneut oder schreib mir direkt eine E-Mail (Link im Footer)."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Absenden";
    }
  });

  function goToStep(stepNumber) {
    steps.forEach((step) => {
      const isActive = Number(step.getAttribute("data-step")) === stepNumber;
      step.classList.toggle("hidden", !isActive);
    });
    document.querySelectorAll("[data-progress-step]").forEach((dot) => {
      const n = Number(dot.getAttribute("data-progress-step"));
      dot.classList.toggle("is-active", n <= stepNumber);
    });
    if (stepNumber !== 1) return;
    step1Next.disabled = !serviceInput.value;
  }

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
  }

  function hideError() {
    if (!errorBox) return;
    errorBox.classList.add("hidden");
    errorBox.textContent = "";
  }
});
