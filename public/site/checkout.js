import "./main.js";
import {
  clearCart,
  formatUSD,
  getCart,
  getCartItems,
  getCartSubtotal,
  removeProduct,
  setProductQuantity,
} from "./store.js";

const itemsContainer = document.querySelector("[data-checkout-items]");
const emptyState = document.querySelector("[data-checkout-empty]");
const orderPanel = document.querySelector("[data-order-panel]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const subtotalElements = document.querySelectorAll("[data-checkout-subtotal]");
const itemCountElement = document.querySelector("[data-checkout-item-count]");
const confirmation = document.querySelector("[data-order-confirmation]");
const confirmationReference = document.querySelector("[data-order-reference]");
const confirmationEmail = document.querySelector("[data-order-email]");
const clearCartButton = document.querySelector("[data-clear-cart]");

const renderCheckout = () => {
  const cart = getCart();
  const items = getCartItems(cart);
  const isEmpty = items.length === 0;

  if (emptyState) emptyState.hidden = !isEmpty;
  if (orderPanel) orderPanel.hidden = isEmpty;
  if (checkoutForm) checkoutForm.hidden = isEmpty;
  if (clearCartButton) clearCartButton.hidden = isEmpty;

  if (itemsContainer) {
    itemsContainer.innerHTML = items
      .map(
        (item) => `
          <article class="checkout-item" data-checkout-item="${item.id}">
            <div class="checkout-item-number">${item.number}</div>
            <div class="checkout-item-copy">
              <small>${item.category} · ${item.timeline}</small>
              <h3>${item.name}</h3>
              <p>${formatUSD(item.price)} · ${item.priceSuffix}</p>
            </div>
            <div class="quantity-control" aria-label="Quantity for ${item.name}">
              <button type="button" data-quantity-action="decrease" data-product-id="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
              <output aria-live="polite">${item.quantity}</output>
              <button type="button" data-quantity-action="increase" data-product-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
            </div>
            <strong>${formatUSD(item.lineTotal)}</strong>
            <button class="remove-item" type="button" data-remove-product="${item.id}">Remove</button>
          </article>
        `,
      )
      .join("");
  }

  const subtotal = formatUSD(getCartSubtotal(cart));
  subtotalElements.forEach((element) => {
    element.textContent = subtotal;
  });
  if (itemCountElement) {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    itemCountElement.textContent = `${count} package${count === 1 ? "" : "s"}`;
  }
};

itemsContainer?.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity-action]");
  const removeButton = event.target.closest("[data-remove-product]");

  if (quantityButton) {
    const id = quantityButton.dataset.productId;
    const currentQuantity = getCart()[id] || 0;
    const change = quantityButton.dataset.quantityAction === "increase" ? 1 : -1;
    setProductQuantity(id, currentQuantity + change);
  }

  if (removeButton) removeProduct(removeButton.dataset.removeProduct);
});

clearCartButton?.addEventListener("click", () => {
  clearCart();
});

checkoutForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) return;

  const items = getCartItems();
  if (!items.length) {
    renderCheckout();
    return;
  }

  const formData = new FormData(checkoutForm);
  const reference = `ETK-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const orderLines = items.map(
    (item) => `${item.quantity} × ${item.name} — ${formatUSD(item.lineTotal)}`,
  );
  const emailBody = [
    "Etkahn service package order",
    `Reference: ${reference}`,
    "",
    `Name: ${formData.get("name")}`,
    `Business: ${formData.get("business")}`,
    `Email: ${formData.get("email")}`,
    `Phone: ${formData.get("phone")}`,
    `Location: ${formData.get("location")}`,
    "",
    "Packages:",
    ...orderLines,
    "",
    `Indicative subtotal before applicable taxes: ${formatUSD(getCartSubtotal())}`,
    "",
    `Project context: ${formData.get("context") || "Not provided"}`,
    "",
    "I have reviewed the Etkahn Terms, Returns & Refunds Policy, and Shipping & Service Delivery Policy.",
  ].join("\n");
  const mailto = `mailto:hello@etkahn.com?subject=${encodeURIComponent(`Service package order ${reference}`)}&body=${encodeURIComponent(emailBody)}`;

  if (confirmationReference) confirmationReference.textContent = reference;
  if (confirmationEmail) confirmationEmail.href = mailto;
  if (confirmation) confirmation.hidden = false;
  checkoutForm.hidden = true;
  confirmation?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.location.href = mailto;
});

window.addEventListener("etkahn:cart-change", renderCheckout);
renderCheckout();
