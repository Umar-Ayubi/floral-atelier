const products = {
  morning: {
    name: "The Morning Sunlit Peony",
    description: "A loose, light-catching mix made for slow mornings, open windows, and someone you love.",
    stems: "Peonies, garden roses, seasonal filler & airy greens.",
    price: 95,
    image: "https://placehold.co/700x900/E8C5C1/1E352F?text=Morning+Sunlit+Peony",
  },
  gardenia: {
    name: "Botanical Gardenia Luxe",
    description: "A lush, sculptural garden arrangement with creamy blooms and beautiful movement.",
    stems: "Gardenias, lisianthus, textural foliage & seasonal accents.",
    price: 125,
    image: "https://placehold.co/700x900/E6E4D9/1E352F?text=Botanical+Gardenia+Luxe",
  },
  velvet: {
    name: "Velvet Rose & Ranunculus",
    description: "A romantic, petal-soft arrangement with plenty of personality and a hint of nostalgia.",
    stems: "Velvety roses, ranunculus, sweet peas & soft greenery.",
    price: 110,
    image: "https://placehold.co/700x900/DCC6C0/1E352F?text=Velvet+Rose+%26+Ranunculus",
  },
  coastal: {
    name: "Coastal Wildflower Study",
    description: "A meadow-inspired gathering of delicate blooms, relaxed lines, and coastal color.",
    stems: "Seasonal meadow blooms, cosmos, grasses & gathered greenery.",
    price: 85,
    image: "https://placehold.co/700x900/D9E0D9/1E352F?text=Coastal+Wildflower+Study",
  },
};

const dialog = document.querySelector("#product-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogStems = document.querySelector("#dialog-stems");
const dialogPrice = document.querySelector("#dialog-price");
const bouquetSize = document.querySelector("#bouquet-size");
let selectedProduct;

function updateDialogPrice() {
  if (!selectedProduct) return;
  const total = selectedProduct.price + Number(bouquetSize.value);
  dialogPrice.textContent = `$${total}`;
  document.querySelector("#dialog-cta").href = "#inquire";
}

function openProduct(productKey) {
  const product = products[productKey];
  if (!product) return;
  selectedProduct = product;
  dialogTitle.textContent = product.name;
  dialogDescription.textContent = product.description;
  dialogStems.textContent = product.stems;
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
  const size = bouquetSize.selectedOptions[0].textContent.split(" — ")[0];
  const notes = document.querySelector("#inquiry-form [name='notes']");
  notes.value = `I'm interested in ${selectedProduct.name} in the ${size} size ($${dialogPrice.textContent.slice(1)}).`;
  dialog.close();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    document.querySelectorAll(".product-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector("#design-count").textContent = `${String(visibleCount).padStart(2, "0")} ${visibleCount === 1 ? "DESIGN" : "DESIGNS"}`;
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
  document.querySelector("#inquiry-message").textContent = `Thank you, ${name}! Your flower note is ready for our studio. We’ll be in touch soon.`;
  event.currentTarget.reset();
  deliveryDate.min = localToday.toISOString().slice(0, 10);
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  document.querySelector("#newsletter-message").textContent = "You’re on the list—watch your inbox for a little flower mail.";
  event.currentTarget.reset();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
