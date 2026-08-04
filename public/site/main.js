import { addProduct, getCartCount } from "./store.js";

document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const menuLabel = menuToggle?.querySelector(".menu-label");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const header = document.querySelector("[data-header]");
const reveals = [...document.querySelectorAll(".reveal")];
const cartCountElements = [...document.querySelectorAll("[data-cart-count]")];
const addProductButtons = [...document.querySelectorAll("[data-add-product]")];
const cartToast = document.querySelector("[data-cart-toast]");

const updateCartCount = () => {
  const count = getCartCount();
  cartCountElements.forEach((element) => {
    element.textContent = String(count);
  });
  document.querySelectorAll("[data-cart-link]").forEach((link) => {
    link.setAttribute("aria-label", `Cart with ${count} service package${count === 1 ? "" : "s"}`);
  });
};

addProductButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addProduct(button.dataset.addProduct);
    const originalLabel = button.dataset.defaultLabel || button.textContent.trim();
    button.dataset.defaultLabel = originalLabel;
    button.textContent = "Added to cart ✓";
    button.classList.add("is-added");
    if (cartToast) cartToast.textContent = `${button.dataset.productName} added. Cart now has ${getCartCount()} package${getCartCount() === 1 ? "" : "s"}.`;
    window.setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove("is-added");
    }, 1400);
    window.setTimeout(() => {
      if (cartToast) cartToast.textContent = "";
    }, 3200);
  });
});

window.addEventListener("etkahn:cart-change", updateCartCount);
window.addEventListener("storage", updateCartCount);
updateCartCount();

const setMenuState = (isOpen, returnFocus = false) => {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  siteNav?.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";

  if (isOpen) {
    navLinks[0]?.focus();
  } else if (returnFocus) {
    menuToggle?.focus();
  }
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    setMenuState(false);

    if (href?.startsWith("#")) {
      const destination = document.querySelector(href);
      window.requestAnimationFrame(() => {
        if (!destination) return;
        if (!destination.hasAttribute("tabindex")) destination.setAttribute("tabindex", "-1");
        destination.focus({ preventScroll: true });
      });
    }
  });
});

document.addEventListener("keydown", (event) => {
  const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  if (!isOpen) return;

  if (event.key === "Escape") {
    event.preventDefault();
    setMenuState(false, true);
    return;
  }

  if (event.key === "Tab") {
    const focusable = [menuToggle, ...navLinks].filter(Boolean);
    const currentIndex = focusable.indexOf(document.activeElement);
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + focusable.length) % focusable.length
      : (currentIndex + 1) % focusable.length;
    event.preventDefault();
    focusable[nextIndex]?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenuState(false);
});

let scrollFrame;
const updateHeader = () => {
  window.cancelAnimationFrame(scrollFrame);
  scrollFrame = window.requestAnimationFrame(() => {
    header?.classList.toggle("is-scrolled", window.scrollY > 28);
  });
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${(index % 4) * 55}ms`;
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
