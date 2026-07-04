/* Mo Digital – shared site behavior: mobile nav, scroll-reveal, footer year, FAQ accordion */

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initMobileNav();
  initScrollReveal();
  initFaqAccordions();
});

function initFooterYear() {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("overflow-hidden", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* Accessible accordion: works for any [data-accordion] container with
   [data-accordion-item] > [data-accordion-trigger] + [data-accordion-panel] */
function initFaqAccordions() {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const items = accordion.querySelectorAll("[data-accordion-item]");

    items.forEach((item) => {
      const trigger = item.querySelector("[data-accordion-trigger]");
      const panel = item.querySelector("[data-accordion-panel]");
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        closeAllAccordionItems(items);
        if (!isOpen) openAccordionItem(trigger, panel);
      });
    });
  });
}

function openAccordionItem(trigger, panel) {
  trigger.setAttribute("aria-expanded", "true");
  panel.style.height = panel.scrollHeight + "px";
  panel.addEventListener(
    "transitionend",
    () => {
      if (trigger.getAttribute("aria-expanded") === "true") panel.style.height = "auto";
    },
    { once: true }
  );
}

function closeAllAccordionItems(items) {
  items.forEach((item) => {
    const trigger = item.querySelector("[data-accordion-trigger]");
    const panel = item.querySelector("[data-accordion-panel]");
    if (!trigger || !panel) return;
    if (trigger.getAttribute("aria-expanded") === "true") {
      panel.style.height = panel.scrollHeight + "px";
      requestAnimationFrame(() => {
        panel.style.height = "0px";
      });
    } else {
      panel.style.height = "0px";
    }
    trigger.setAttribute("aria-expanded", "false");
  });
}
