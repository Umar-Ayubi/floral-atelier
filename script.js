/* ==========================================================================
   CASEY SCADUTO FLORAL ATELIER - APPLICATION CONTROLLER
   ========================================================================== */

const signatureEditions = [
    {
        id: 1,
        title: "The Crimson Nocturne Study",
        category: "crimson",
        price: 265,
        image: "images/dark-redpink-flowers.jpeg",
        description: "Deep burgundy garden roses, oxblood ranunculus, and trailing dark foliage arranged in an artisanal ceramic vessel.",
        notes: "Moody, theatrical, and exceptionally rich in tone."
    },
    {
        id: 2,
        title: "The Morning Peony Compote",
        category: "blush",
        price: 295,
        image: "images/darkpink-lightpink-and-white-flowers.jpeg",
        description: "Luminous dark pink, light pink, and ivory statement peonies paired with delicate seasonal filler foliage.",
        notes: "Soft romance with an unmistakable sculptural presence."
    },
    {
        id: 3,
        title: "Verdant Conservatory & Orchid Triptych",
        category: "verdant",
        price: 380,
        image: "images/3vases-1purplebluepeachgreenonionflowers-2and3-greenpeachpinkgreenleavesandgreenonionflowers.jpeg",
        description: "A breathtaking three-vases compilation featuring purple-blue accents, peach tones, green onion flowers, and trailing leaves.",
        notes: "Our flagship multi-vessel architectural statement."
    },
    {
        id: 4,
        title: "Coastal Wildflower & Berry Study",
        category: "verdant",
        price: 220,
        image: "images/purple-flowers-on-kitchen-table-plus-rustic-wood-theme-in-bg.jpeg",
        description: "Wild purple blossoms styled against rustic wood aesthetics, capturing the raw coastline of Northern California.",
        notes: "Organic, unscripted, and effortlessly grounded."
    },
    {
        id: 5,
        title: "Porcelain & Blush Elegance",
        category: "blush",
        price: 245,
        image: "images/white-and-lightpink-flowers.jpeg",
        description: "Subtle white and light pink garden blooms in a whitewashed ceramic vessel, designed for quiet luxury.",
        notes: "Refined elegance for intimate dining rooms."
    },
    {
        id: 6,
        title: "Emerald Botanical Sanctuary",
        category: "verdant",
        price: 310,
        image: "images/purple-flowers-in-front-of-beautiful-and-verdant-leaved-plants.jpeg",
        description: "Rich purple florals showcased directly in front of lush, verdant potted botanicals and deep green foliage.",
        notes: "A living study in botanical saturation."
    },
    {
        id: 7,
        title: "Quad-Vase Wood Table Symphony",
        category: "verdant",
        price: 450,
        image: "images/four-vases-on-wood-table-1whitepinkyellowpeach-2lightpinkgreen-3orangegreen-4peachgreenyellowlightblue.jpeg",
        description: "Four distinct artisanal vases featuring white, pink, yellow, peach, orange, and light blue botanical harmonies.",
        notes: "The ultimate centerpiece collection for long dining tables."
    },
    {
        id: 8,
        title: "Goldenrod & Peach Ranunculus",
        category: "crimson",
        price: 235,
        image: "images/goldenrod-peachranunculus-yellowcallalily-smalllightblueflowers-all-in-one-vase-on-wood-table.jpeg",
        description: "Goldenrod, peach ranunculus, yellow calla lilies, and delicate light blue blossoms united in a rustic wooden setting.",
        notes: "Warm sunlight translated into floral form."
    },
    {
        id: 9,
        title: "Chrysanthemum & Sea Holly Glass",
        category: "blush",
        price: 215,
        image: "images/lightpink-chrysantheum,-daisies,-long-green-leaves,-and-greyblue-seahollies-all-in-a-glass-vase.jpeg",
        description: "Light pink chrysanthemums, delicate daisies, elongated green leaves, and cool grey-blue sea hollies in clear glass.",
        notes: "Textural contrast with a crisp coastal breeze feel."
    },
    {
        id: 10,
        title: "Dahlia, Orchid & Onion Flower Suite",
        category: "crimson",
        price: 280,
        image: "images/lightpinkdahlia-whiteorchids-mutedgreenleafstems-greenonionflower-.jpeg",
        description: "Light pink dahlias paired with pristine white orchids, muted green leaf stems, and architectural green onion flowers.",
        notes: "Exotic, architectural, and highly sophisticated."
    },
    {
        id: 11,
        title: "Triptych: White Orchid & Ball Dahlia",
        category: "blush",
        price: 340,
        image: "images/three-vases-on-wood-table-each-has-white-orchid-lightpink-ball-dahlia-white-baneberry-.jpeg",
        description: "Three wooden-table vessels, each featuring white orchids, light pink ball dahlias, and white baneberry branches.",
        notes: "Balanced symmetry across a triple-vessel display."
    },
    {
        id: 12,
        title: "Dual Amber & Orange Harvest",
        category: "crimson",
        price: 275,
        image: "images/two-vases-of-orangeflowers-pinkchrysantheums-tightlypackedgreenbunches-greenonionflower.jpeg",
        description: "Two companion vases of vibrant orange blossoms, pink chrysanthemums, tightly packed green bunches, and onion flowers.",
        notes: "Bold, saturated, and warm."
    },
    {
        id: 13,
        title: "The Napa Valley Estate Compote",
        category: "verdant",
        price: 325,
        image: "images/vase-in-candid-environment-with-orangeflowers-whiteorchids-yellowcallalily-greenleafstem-onionflower.jpeg",
        description: "Orange flowers, white orchids, yellow calla lilies, and structural onion stems photographed in a candid estate light.",
        notes: "Designed for wine country tables and grand foyers."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(signatureEditions);
    initFilters();
    initModal();
    initZipChecker();
});

/* Render Products */
function renderProducts(products) {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card" data-category="${p.category}" onclick="openProductModal(${p.id})">
            <div class="product-image-wrap">
                <span class="product-badge">${p.category.toUpperCase()}</span>
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-desc">${p.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${p.price}</span>
                    <button class="card-action-btn">Commission &rarr;</button>
                </div>
            </div>
        </div>
    `).join("");
}

/* Filter Functionality */
function initFilters() {
    const tabs = document.querySelectorAll(".filter-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");
            if (filter === "all") {
                renderProducts(signatureEditions);
            } else {
                const filtered = signatureEditions.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });
}

/* Modal Controller */
const modalBackdrop = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");
const openInquiryBtn = document.getElementById("openInquiryModal");

function initModal() {
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }
    if (openInquiryBtn) {
        openInquiryBtn.addEventListener("click", () => {
            openGeneralInquiryModal();
        });
    }
}

function openProductModal(id) {
    const product = signatureEditions.find(p => p.id === id);
    if (!product) return;

    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <div class="modal-layout">
            <div class="modal-img-wrap">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="modal-details">
                <span class="eyebrow">Signature Edition</span>
                <h3>${product.title}</h3>
                <span class="modal-price" id="modalPrice">$${product.price}</span>
                <p class="modal-desc">${product.description}</p>
                <p style="font-size:0.85rem; color:#13291E; font-weight:600; margin-bottom:1.5rem;">Curation Note: ${product.notes}</p>
                
                <div class="size-options">
                    <label>Select Scale / Vessel Tier</label>
                    <div class="size-buttons">
                        <div class="size-btn active" onclick="updatePrice(${product.price}, this)">Atelier Standard ($${product.price})</div>
                        <div class="size-btn" onclick="updatePrice(${product.price + 90}, this)">Grand Estate ($${product.price + 90})</div>
                    </div>
                </div>

                <form class="modal-inquiry-form" onsubmit="handleInquirySubmit(event, '${product.title}')">
                    <input type="text" placeholder="Your Full Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="text" placeholder="Preferred Delivery Date (MM/DD/YYYY)" required>
                    <textarea placeholder="Custom color requests or delivery notes (optional)"></textarea>
                    <button type="submit" class="btn btn-primary" style="width:100%;">Submit Commission Request</button>
                </form>
            </div>
        </div>
    `;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function openGeneralInquiryModal() {
    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <div style="padding: 1rem;">
            <span class="eyebrow">Bespoke Commission</span>
            <h3 style="font-size: 2rem; color: #13291E; margin-bottom: 0.5rem;">Custom Floral Consultation</h3>
            <p style="color: #7A7067; margin-bottom: 1.5rem; font-size: 0.95rem;">Tell us about your upcoming event, wedding, or private residence installation across the San Francisco Bay Area.</p>
            
            <form class="modal-inquiry-form" onsubmit="handleInquirySubmit(event, 'Custom Bespoke Consultation')">
                <input type="text" placeholder="Your Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="text" placeholder="Phone Number" required>
                <input type="text" placeholder="Event Date or Installation Timeline" required>
                <textarea placeholder="Share your vision, floral palette preferences, and venue location..."></textarea>
                <button type="submit" class="btn btn-primary" style="width:100%;">Request Private Consultation</button>
            </form>
        </div>
    `;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    if (modalBackdrop) {
        modalBackdrop.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

function updatePrice(basePrice, el) {
    document.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));
    el.classList.add("active");
    document.getElementById("modalPrice").textContent = `$${basePrice}`;
}

function handleInquirySubmit(e, itemTitle) {
    e.preventDefault();
    alert(`Thank you! Your commission request for "${itemTitle}" has been received by Casey Scaduto Floral. Our studio manager will reach out within 4 business hours to confirm delivery details.`);
    closeModal();
}

/* Zip Code Delivery Validator */
function initZipChecker() {
    const btn = document.getElementById("checkZipBtn");
    const input = document.getElementById("zipInput");
    const result = document.getElementById("zipResult");

    if (!btn) return;

    const validZones = [
        "94102", "94103", "94104", "94105", "94107", "94108", "94109", "94111", "94114", "94115", "94117", "94118", "94121", "94122", "94123", "94124", "94127", "94129", "94131", "94133", "94158",
        "94901", "94903", "94904", "94920", "94925", "94941", "94960", "94965",
        "94501", "94601", "94602", "94609", "94611", "94612", "94702", "94703", "94704", "94705", "94708",
        "94558", "94559"
    ];

    btn.addEventListener("click", () => {
        const zip = input.value.trim();
        if (zip.length !== 5) {
            result.style.color = "#E58E73";
            result.textContent = "Please enter a valid 5-digit Bay Area postal code.";
            return;
        }

        if (validZones.includes(zip) || zip.startsWith("94")) {
            result.style.color = "#E8C88B";
            result.textContent = "✓ In-Zone: Eligible for white-glove hand delivery & temperature-controlled transit.";
        } else {
            result.style.color = "#E58E73";
            result.textContent = "• Extended Zone: Please contact the studio directly for bespoke courier dispatch quotes.";
        }
    });
}