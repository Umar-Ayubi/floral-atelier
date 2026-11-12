const products = {
  crimson: {
    name: "The Crimson & Velvet Study",
    description:
      "A moody, architectural composition saturated in oxblood, deep carmine, and velvety crimson tones—designed to anchor a room.",
    stems: "Heirloom blood-red garden roses, burgundy ranunculus, chocolate cosmos & dark copper foliage.",
    price: 135,
    image: "images/dark-redpink-flowers.jpg",
  },
  morning: {
    name: "The Morning Sunlit Peony",
    description:
      "A layered gradient from saturated magenta-pink to soft petal blush, capturing early light across an open table.",
    stems: "Coral-crimson peonies, blush spray roses, sweet peas & trailing jasmine vine.",
    price: 120,
    image: "images/darkpink-lightpink-and-white-flowers.jpg",
  },
  verdant: {
    name: "Verdant Botanical & Plum",
    description:
      "Lush forest greens paired with deep violet and plum blossoms for an organic, woodland-gathered silhouette.",
    stems: "Deep plum scabiosa, purple sweet peas, hellebores & wild Marin fern fronds.",
    price: 140,
    image: "images/purple-flowers-in-front-of-beautiful-and-verdant-leaved-plants.jpg",
  },
  porcelaine: {
    name: "The Porcelaine & Blush Edit",
    description:
      "Refined, luminous ivory petals punctuated by quiet rose undertones and silvery-green Mediterranean branches.",
    stems: "Alabaster lisianthus, heirloom blush garden roses, white ranunculus & olive foliage.",
    price: 110,
    image: "images/white-and-lightpink-flowers.jpg",
  },
  coastal: {
    name: "Coastal Wildflower Study",
    description:
      "An unhurried, airy gathering of Northern California meadow blooms and wild grasses with effortless movement.",
    stems: "Marin meadow cosmos, wild delphinium, lavender-plum accents & coastal grasses.",
    price: 95,
    image: "images/purple-flowers-on-kitchen-table-plus-rustic-wood-theme-in-bg.jpg",
  },
  compote: {
    name: "Atelier Table Compote",
    description:
      "Designed low and lush for intimate dinner conversation, arranged in a footed matte ceramic studio vessel.",
    stems: "Seasonal market focal blooms, trailing greenery & sculptural textural branches.",
    price: 165,
    image: "images/candid-arrangement-photo-in-room-natural.jpg",
  },
};

const dialog = document.querySelector("#product-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogStems = document.querySelector("#dialog-stems");
const dialogPrice = document.querySelector("#dialog-price");
const bouquetSize = document.querySelector("#bouquet-size");
let selectedProduct = null;

function updateDialogPrice() {
  if (!selectedProduct) return;
  const total = selectedProduct.price + Number(bouquetSize.value);
  dialogPrice.textContent = `$${total}`;
}

function openProduct(productKey) {
  const product = products[productKey];
  if (!product) return;
  selectedProduct = product;
  dialogTitle.textContent = product.name;
  dialogDescription.textContent = product.description;
  dialogStems.textContent = `Botanical Notes: ${product.stems}`;
  dialogImage.src = product.image;
  dialogImage.alt = product.name;
  bouquetSize.value = "0";
  updateDialogPrice();
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

document.querySelectorAll(".quick-view").forEach((button) => {
  button.addEventListener("click", () => openProduct(button.dataset.product));
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

bouquetSize.addEventListener("change", updateDialogPrice);

document.querySelector("#dialog-cta").addEventListener("click", () => {
  if (!selectedProduct) return;
  const sizeLabel = bouquetSize.selectedOptions[0].textContent.split(" — ")[0];
  const notes = document.querySelector("#inquiry-form [name='notes']");
  notes.value = `Commission request: ${selectedProduct.name} (${sizeLabel}, ${dialogPrice.textContent}). `;
  dialog.close();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((btn) => {
      const active = btn === button;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    let visibleCount = 0;
    document.querySelectorAll(".product-card").forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    document.querySelector("#design-count").textContent = `${String(visibleCount).padStart(2, "0")} ${
      visibleCount === 1 ? "EDITION" : "EDITIONS"
    }`;
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.querySelector(".sr-only").textContent = expanded ? "Open navigation menu" : "Close navigation menu";
  navigation.classList.toggle("is-open", !expanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
    navigation.classList.remove("is-open");
  });
});

const deliveryDate = document.querySelector("#delivery-date");
const localToday = new Date();
localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
deliveryDate.min = localToday.toISOString().slice(0, 10);

document.querySelector("#inquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const name = new FormData(event.currentTarget).get("name").toString().trim();
  document.querySelector("#inquiry-message").textContent =
    `Thank you, ${name}. Your commission details have been received by the studio—we will follow up shortly.`;
  event.currentTarget.reset();
  deliveryDate.min = localToday.toISOString().slice(0, 10);
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  document.querySelector("#newsletter-message").textContent =
    "Thank you for subscribing to our seasonal studio dispatches.";
  event.currentTarget.reset();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());