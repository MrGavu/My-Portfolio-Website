// Your WhatsApp number: country code first, no "+" or spaces
const WHATSAPP = "233XXXXXXXXX";

const services = [
  {
    category: "Branding", name: "Logo Design", price: "GHS350",
    desc: "A custom logo built around your brand.",
    includes: ["Original concept, no templates", "Colour and one-colour versions", "Files for print and web"],
    images: ["assets/logo/1.jpg", "assets/logo/2.jpg", "assets/logo/3.jpg"]
  },
  {
    category: "Branding", name: "Business Card Design", price: "GHS200",
    desc: "Clean, memorable business cards ready for print.",
    includes: ["Front and back layout", "Print-ready file with bleed", "Matched to your brand colours"],
    images: ["assets/business-card/1.jpg", "assets/business-card/2.jpg", "assets/business-card/3.jpg"]
  },
  {
    category: "Branding", name: "Letterhead Design", price: "GHS200",
    desc: "Professional letterhead for official documents.",
    includes: ["Branded header and footer", "Print and digital versions", "Consistent with your logo"],
    images: ["assets/letterhead/1.jpg", "assets/letterhead/2.jpg", "assets/letterhead/3.jpg"]
  },
  {
    category: "Print", name: "Flyer Design", price: "GHS150",
    desc: "Eye-catching flyers for events and promotions.",
    includes: ["Layout built around your message", "Print and social media sizes", "Print-ready file"],
    images: ["assets/flyer/1.jpg", "assets/flyer/2.jpg", "assets/flyer/3.jpg"]
  },
  {
    category: "Print", name: "Pull-up Banner Design", price: "GHS350",
    desc: "Large-format banners for events, shops and stands.",
    includes: ["Sized to standard pull-up dimensions", "High-resolution print file", "Bold and readable from a distance"],
    images: ["assets/banner/1.jpg", "assets/banner/2.jpg", "assets/banner/3.jpg"]
  },
  {
    category: "Print", name: "Sticker Design", price: "",   // empty price shows "Get a quote"
    desc: "Custom stickers for packaging, products and branding.",
    includes: ["Any shape or size", "Cut line included", "Print-ready file"],
    images: ["assets/stickers/1.jpg", "assets/stickers/2.jpg", "assets/stickers/3.jpg"]
  },
  {
    category: "Merchandise", name: "T-Shirt Design", price: "GHS150",
    desc: "Original t-shirt graphics ready for printing.",
    includes: ["Original artwork", "Print-ready file", "Mockup preview"],
    images: ["assets/tshirt/1.jpg", "assets/tshirt/2.jpg", "assets/tshirt/3.jpg"]
  },
  {
    category: "Merchandise", name: "Cap Design", price: "GHS100",
    desc: "Cap designs prepared for embroidery or print.",
    includes: ["Placement-ready artwork", "Embroidery or print version", "Mockup preview"],
    images: ["assets/cap/1.jpg", "assets/cap/2.jpg", "assets/cap/3.jpg"]
  },
  {
    category: "Web", name: "Website Design + Development", price: "GHS6,000",
    desc: "A custom website designed and built from scratch.",
    includes: ["Custom design, fully mobile responsive", "Built and deployed live", "Smooth animations and clean code"],
    images: ["assets/website/1.jpg", "assets/website/2.jpg", "assets/website/3.jpg"]
  }
];

/* ---------- rendering ---------- */
const grid = document.getElementById("svcGrid");
const tabsEl = document.getElementById("tabs");

const ICON_PREV = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
const ICON_NEXT = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

const waLink = (name) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Joshua, I'd like to order: " + name)}`;

const cardHTML = (s, i) => `
  <article class="svc-card" data-category="${s.category}" style="--i:${i}">
    <div class="slider">
      <div class="slides">
        ${s.images.map((src, n) => `
          <div class="slide"><img src="${src}" alt="${s.name} sample ${n + 1}" loading="lazy" onerror="this.remove()"></div>`).join("")}
      </div>
      ${s.images.length > 1 ? `
        <button class="s-arrow s-prev" aria-label="Previous sample">${ICON_PREV}</button>
        <button class="s-arrow s-next" aria-label="Next sample">${ICON_NEXT}</button>
        <div class="s-count">1 / ${s.images.length}</div>` : ""}
    </div>
    <div class="svc-body">
      <span class="svc-cat">${s.category}</span>
      <div class="svc-head">
        <h3>${s.name}</h3>
        <span class="svc-price">${s.price || "Get a quote"}</span>
      </div>
      <p>${s.desc}</p>
      <ul>${s.includes.map((x) => `<li>${x}</li>`).join("")}</ul>
      <a class="svc-cta" href="${waLink(s.name)}" target="_blank" rel="noopener noreferrer">Order this service →</a>
    </div>
  </article>`;

grid.innerHTML = services.map(cardHTML).join("");

/* ---------- image sliders (arrows + swipe) ---------- */
const initSlider = (slider) => {
  const track = slider.querySelector(".slides");
  const total = track.children.length;
  const count = slider.querySelector(".s-count");
  let index = 0;

  const go = (n) => {
    index = (n + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    if (count) count.textContent = `${index + 1} / ${total}`;
  };

  const prev = slider.querySelector(".s-prev");
  const next = slider.querySelector(".s-next");
  if (prev) prev.addEventListener("click", () => go(index - 1));
  if (next) next.addEventListener("click", () => go(index + 1));

  let startX = null;
  slider.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
};
grid.querySelectorAll(".slider").forEach(initSlider);

/* ---------- category tabs ---------- */
const categories = ["All", ...new Set(services.map((s) => s.category))];
tabsEl.innerHTML = categories
  .map((c, i) => `<button class="tab${i === 0 ? " is-active" : ""}" data-filter="${c}">${c}</button>`)
  .join("");

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t === btn));
  grid.querySelectorAll(".svc-card").forEach((card) => {
    const show = btn.dataset.filter === "All" || card.dataset.category === btn.dataset.filter;
    card.classList.toggle("is-hidden", !show);
  });
});