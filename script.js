const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      siteNav.classList.remove("is-open");
    });
  });
}

const year = new Date().getFullYear();
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = year;
});

const motionPreference = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : null;

if ((!motionPreference || !motionPreference.matches) && "IntersectionObserver" in window) {
  const revealTargets = [
    ...document.querySelectorAll(".skill-list li"),
    ...document.querySelectorAll(".contact-links > *")
  ].filter(Boolean);

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", String((index % 5) * 70) + "ms");
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -4% 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

