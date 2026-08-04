export const PRODUCTS = Object.freeze([
  {
    id: "workflow-diagnostic",
    number: "01",
    category: "Diagnose",
    name: "Systems & Workflow Diagnostic",
    shortName: "Workflow Diagnostic",
    price: 350,
    priceSuffix: "fixed package",
    timeline: "5 business days",
    description: "A focused review of how work, information, and decisions move through your business.",
  },
  {
    id: "automation-sprint",
    number: "02",
    category: "Automate",
    name: "Business Automation Sprint",
    shortName: "Automation Sprint",
    price: 800,
    priceSuffix: "fixed package",
    timeline: "2 weeks",
    description: "Redesign and automate one high-friction workflow, then hand it over clearly.",
  },
  {
    id: "integration-setup",
    number: "03",
    category: "Connect",
    name: "Systems Integration Setup",
    shortName: "Integration Setup",
    price: 1000,
    priceSuffix: "starting package",
    timeline: "2–3 weeks",
    description: "Connect two standard business platforms with mapped, tested data movement.",
  },
  {
    id: "internal-tool-prototype",
    number: "04",
    category: "Build",
    name: "Internal Tool Prototype",
    shortName: "Tool Prototype",
    price: 1600,
    priceSuffix: "starting package",
    timeline: "3–4 weeks",
    description: "A working prototype for the missing operational tool your team needs most.",
  },
  {
    id: "website-launch",
    number: "05",
    category: "Launch",
    name: "Conversion Website Launch",
    shortName: "Website Launch",
    price: 1150,
    priceSuffix: "starting package",
    timeline: "3–4 weeks",
    description: "Strategy, design, and development for a fast five-page business website.",
  },
  {
    id: "dashboard-build",
    number: "06",
    category: "See",
    name: "Reporting Dashboard Build",
    shortName: "Dashboard Build",
    price: 850,
    priceSuffix: "starting package",
    timeline: "2–3 weeks",
    description: "A decision-ready dashboard connecting up to three agreed data sources.",
  },
  {
    id: "team-workshop",
    number: "07",
    category: "Embed",
    name: "Team Enablement Workshop",
    shortName: "Team Workshop",
    price: 300,
    priceSuffix: "per workshop",
    timeline: "1 working day",
    description: "Practical, role-based training for up to twelve people, with usable materials.",
  },
  {
    id: "technology-partner",
    number: "08",
    category: "Improve",
    name: "Technology Partner — 30 Days",
    shortName: "Technology Partner",
    price: 625,
    priceSuffix: "per 30 days",
    timeline: "Renewable monthly",
    description: "A reserved monthly block for technical stewardship, support, and continuous improvement.",
  },
]);

const CART_KEY = "etkahn-cart-v1";
const MAX_QUANTITY = 5;
const productById = new Map(PRODUCTS.map((product) => [product.id, product]));

export const formatUSD = (amount) =>
  `USD ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount)}`;

const sanitiseCart = (cart) => {
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) return {};

  return Object.fromEntries(
    Object.entries(cart)
      .filter(([id]) => productById.has(id))
      .map(([id, quantity]) => [
        id,
        Math.min(MAX_QUANTITY, Math.max(0, Math.floor(Number(quantity) || 0))),
      ])
      .filter(([, quantity]) => quantity > 0),
  );
};

export const getCart = () => {
  try {
    return sanitiseCart(JSON.parse(window.localStorage.getItem(CART_KEY) || "{}"));
  } catch {
    return {};
  }
};

const saveCart = (cart) => {
  const safeCart = sanitiseCart(cart);
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(safeCart));
  } catch {
    // The cart still works for the current action when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent("etkahn:cart-change", { detail: safeCart }));
  return safeCart;
};

export const addProduct = (id) => {
  if (!productById.has(id)) return getCart();
  const cart = getCart();
  cart[id] = Math.min(MAX_QUANTITY, (cart[id] || 0) + 1);
  return saveCart(cart);
};

export const setProductQuantity = (id, quantity) => {
  const cart = getCart();
  if (!productById.has(id) || quantity <= 0) delete cart[id];
  else cart[id] = Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
  return saveCart(cart);
};

export const removeProduct = (id) => setProductQuantity(id, 0);

export const clearCart = () => saveCart({});

export const getCartItems = (cart = getCart()) =>
  Object.entries(cart)
    .map(([id, quantity]) => {
      const product = productById.get(id);
      return product ? { ...product, quantity, lineTotal: product.price * quantity } : null;
    })
    .filter(Boolean);

export const getCartCount = (cart = getCart()) =>
  Object.values(cart).reduce((total, quantity) => total + quantity, 0);

export const getCartSubtotal = (cart = getCart()) =>
  getCartItems(cart).reduce((total, item) => total + item.lineTotal, 0);
