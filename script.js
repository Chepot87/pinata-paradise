/* =====================================================
   PIÑATA PARADISE
   Main JavaScript
===================================================== */

/* =====================================================
   1. FEATURED PRODUCT TILT
===================================================== */

const heroProductCard = document.getElementById("hero-product-card");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroProductCard && !prefersReducedMotion.matches) {
  heroProductCard.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const rect = heroProductCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;

    heroProductCard.style.setProperty("--tilt-x", `${rotateX}deg`);
    heroProductCard.style.setProperty("--tilt-y", `${rotateY}deg`);
  });

  heroProductCard.addEventListener("pointerleave", () => {
    heroProductCard.style.setProperty("--tilt-x", "0deg");
    heroProductCard.style.setProperty("--tilt-y", "0deg");
  });
}

/* =====================================================
   2. GALLERY LIGHTBOX
===================================================== */

const galleryCards = Array.from(document.querySelectorAll(".gallery__card"));
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.querySelector(".lightbox__content");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxBackdrop = document.querySelector(".lightbox__backdrop");

const lightboxReady = Boolean(
  lightbox &&
  lightboxContent &&
  lightboxImage &&
  lightboxTitle &&
  lightboxDescription &&
  lightboxCounter &&
  lightboxClose &&
  lightboxPrev &&
  lightboxNext &&
  lightboxBackdrop &&
  galleryCards.length
);

let currentIndex = 0;
let lastFocusedElement = null;
let touchStartX = null;
let touchStartY = null;

function updateLightbox() {
  if (!lightboxReady) return;

  const card = galleryCards[currentIndex];
  if (!card) return;

  const image = card.dataset.image || "";
  const title = card.dataset.title || "Piñata personalizada";
  const description = card.dataset.description || "";

  lightboxImage.src = image;
  lightboxImage.alt = `Piñata ${title}`;
  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;
  lightboxCounter.textContent = `${currentIndex + 1} / ${galleryCards.length}`;
}

function openLightbox(index) {
  if (!lightboxReady) return;

  currentIndex = index;
  lastFocusedElement = document.activeElement;

  updateLightbox();
  lightboxContent.scrollTop = 0;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  requestAnimationFrame(() => lightboxClose.focus());
}

function closeLightbox() {
  if (!lightboxReady) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function showNextImage() {
  if (!lightboxReady) return;
  currentIndex = (currentIndex + 1) % galleryCards.length;
  updateLightbox();
  lightboxContent.scrollTop = 0;
}

function showPreviousImage() {
  if (!lightboxReady) return;
  currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
  updateLightbox();
  lightboxContent.scrollTop = 0;
}

function trapFocus(event) {
  if (!lightboxReady || event.key !== "Tab") return;

  const focusable = Array.from(
    lightboxContent.querySelectorAll(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => element instanceof HTMLElement && element.offsetParent !== null);

  if (!focusable.length) {
    event.preventDefault();
    lightboxContent.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

if (lightboxReady) {
  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => openLightbox(index));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNextImage);
  lightboxPrev.addEventListener("click", showPreviousImage);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  lightboxImage.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });

  lightboxImage.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch" || touchStartX === null || touchStartY === null) {
      return;
    }

    const deltaX = event.clientX - touchStartX;
    const deltaY = event.clientY - touchStartY;

    touchStartX = null;
    touchStartY = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX < 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  });
}

/* =====================================================
   3. KEYBOARD CONTROLS
===================================================== */

document.addEventListener("keydown", (event) => {
  if (!lightboxReady || !lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeLightbox();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showNextImage();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPreviousImage();
    return;
  }

  trapFocus(event);
});
