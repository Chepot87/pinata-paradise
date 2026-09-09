/* =====================================================
   PIÑATA PARADISE
   Main JavaScript
===================================================== */


/* =====================================================
   1. MOBILE NAVIGATION
===================================================== */

const navToggle =
  document.getElementById("nav-toggle");

const navMenu =
  document.getElementById("nav-menu");

const navLinks =
  document.querySelectorAll(".nav__link");


function openMenu() {

  if (
    !navToggle ||
    !navMenu
  ) {
    return;
  }

  navToggle.classList.add("active");
  navMenu.classList.add("active");

  navToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  navToggle.setAttribute(
    "aria-label",
    "Cerrar menú"
  );

  document.body.classList.add(
    "menu-open"
  );

}


function closeMenu() {

  if (
    !navToggle ||
    !navMenu
  ) {
    return;
  }

  navToggle.classList.remove("active");
  navMenu.classList.remove("active");

  navToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  navToggle.setAttribute(
    "aria-label",
    "Abrir menú"
  );

  document.body.classList.remove(
    "menu-open"
  );

}


function toggleMenu() {

  if (
    !navToggle ||
    !navMenu
  ) {
    return;
  }

  const isOpen =
    navMenu.classList.contains("active");

  if (isOpen) {

    closeMenu();

  } else {

    openMenu();

  }

}


if (
  navToggle &&
  navMenu
) {

  navToggle.addEventListener(
    "click",
    toggleMenu
  );


  navLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });

}


/* =====================================================
   2. CLOSE MOBILE MENU ON RESIZE
===================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 700
    ) {

      closeMenu();

    }

  }
);


/* =====================================================
   3. FEATURED PRODUCT TILT
===================================================== */

const heroProductCard =
  document.getElementById(
    "hero-product-card"
  );


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (
  heroProductCard &&
  !prefersReducedMotion.matches
) {

  heroProductCard.addEventListener(
    "pointermove",
    (event) => {

      /*
        Only use tilt
        with a real mouse.

        Mobile touch
        does not need this.
      */

      if (
        event.pointerType !== "mouse"
      ) {
        return;
      }


      const rect =
        heroProductCard
          .getBoundingClientRect();


      const mouseX =
        event.clientX -
        rect.left;


      const mouseY =
        event.clientY -
        rect.top;


      const centerX =
        rect.width / 2;


      const centerY =
        rect.height / 2;


      const rotateY =
        (
          (
            mouseX -
            centerX
          ) /
          centerX
        ) * 4;


      const rotateX =
        -(
          (
            mouseY -
            centerY
          ) /
          centerY
        ) * 4;


      heroProductCard
        .style
        .setProperty(
          "--tilt-x",
          `${rotateX}deg`
        );


      heroProductCard
        .style
        .setProperty(
          "--tilt-y",
          `${rotateY}deg`
        );

    }
  );


  heroProductCard.addEventListener(
    "pointerleave",
    () => {

      heroProductCard
        .style
        .setProperty(
          "--tilt-x",
          "0deg"
        );


      heroProductCard
        .style
        .setProperty(
          "--tilt-y",
          "0deg"
        );

    }
  );

}


/* =====================================================
   4. GALLERY LIGHTBOX
===================================================== */

const galleryCards =
  Array.from(
    document.querySelectorAll(
      ".gallery__card"
    )
  );


const lightbox =
  document.getElementById(
    "lightbox"
  );


const lightboxContent =
  document.querySelector(
    ".lightbox__content"
  );


const lightboxImage =
  document.getElementById(
    "lightbox-image"
  );


const lightboxTitle =
  document.getElementById(
    "lightbox-title"
  );


const lightboxDescription =
  document.getElementById(
    "lightbox-description"
  );


const lightboxCounter =
  document.getElementById(
    "lightbox-counter"
  );


const lightboxClose =
  document.getElementById(
    "lightbox-close"
  );


const lightboxPrev =
  document.getElementById(
    "lightbox-prev"
  );


const lightboxNext =
  document.getElementById(
    "lightbox-next"
  );


const lightboxBackdrop =
  document.querySelector(
    ".lightbox__backdrop"
  );


const lightboxReady =
  Boolean(

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


/* =====================================================
   5. UPDATE LIGHTBOX CONTENT
===================================================== */

function updateLightbox() {

  if (
    !lightboxReady
  ) {
    return;
  }


  const card =
    galleryCards[
      currentIndex
    ];


  if (
    !card
  ) {
    return;
  }


  const image =
    card.dataset.image ||
    "";


  const title =
    card.dataset.title ||
    "Piñata personalizada";


  const description =
    card.dataset.description ||
    "";


  lightboxImage.src =
    image;


  lightboxImage.alt =
    `Piñata ${title}`;


  lightboxTitle.textContent =
    title;


  lightboxDescription.textContent =
    description;


  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleryCards.length}`;

}


/* =====================================================
   6. OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

  if (
    !lightboxReady
  ) {
    return;
  }


  closeMenu();


  currentIndex =
    index;


  lastFocusedElement =
    document.activeElement;


  updateLightbox();


  lightboxContent.scrollTop =
    0;


  lightbox.classList.add(
    "active"
  );


  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "lightbox-open"
  );


  requestAnimationFrame(
    () => {

      lightboxClose.focus();

    }
  );

}


/* =====================================================
   7. CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

  if (
    !lightboxReady
  ) {
    return;
  }


  lightbox.classList.remove(
    "active"
  );


  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "lightbox-open"
  );


  if (
    lastFocusedElement
    instanceof
    HTMLElement
  ) {

    lastFocusedElement.focus();

  }

}


/* =====================================================
   8. NEXT IMAGE
===================================================== */

function showNextImage() {

  if (
    !lightboxReady
  ) {
    return;
  }


  currentIndex =
    (
      currentIndex + 1
    ) %
    galleryCards.length;


  updateLightbox();


  lightboxContent.scrollTop =
    0;

}


/* =====================================================
   9. PREVIOUS IMAGE
===================================================== */

function showPreviousImage() {

  if (
    !lightboxReady
  ) {
    return;
  }


  currentIndex =
    (
      currentIndex -
      1 +
      galleryCards.length
    ) %
    galleryCards.length;


  updateLightbox();


  lightboxContent.scrollTop =
    0;

}


/* =====================================================
   10. FOCUS TRAP
===================================================== */

function trapFocus(event) {

  if (
    !lightboxReady ||
    event.key !== "Tab"
  ) {
    return;
  }


  const focusable =
    Array.from(

      lightboxContent
        .querySelectorAll(

          `
          button:not([disabled]),
          a[href],
          [tabindex]:not([tabindex="-1"])
          `

        )

    ).filter(

      (element) =>

        element instanceof
        HTMLElement &&

        element.offsetParent !==
        null

    );


  if (
    !focusable.length
  ) {

    event.preventDefault();

    lightboxContent.focus();

    return;

  }


  const first =
    focusable[0];


  const last =
    focusable[
      focusable.length - 1
    ];


  if (
    event.shiftKey &&
    document.activeElement ===
    first
  ) {

    event.preventDefault();

    last.focus();

  }


  else if (
    !event.shiftKey &&
    document.activeElement ===
    last
  ) {

    event.preventDefault();

    first.focus();

  }

}


/* =====================================================
   11. GALLERY CARD EVENTS
===================================================== */

if (
  lightboxReady
) {

  galleryCards.forEach(
    (card, index) => {

      card.addEventListener(
        "click",
        () => {

          openLightbox(
            index
          );

        }
      );

    }
  );


  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );


  lightboxNext.addEventListener(
    "click",
    showNextImage
  );


  lightboxPrev.addEventListener(
    "click",
    showPreviousImage
  );


  lightboxBackdrop.addEventListener(
    "click",
    closeLightbox
  );

}


/* =====================================================
   12. TOUCH SWIPE
===================================================== */

if (
  lightboxReady
) {

  lightboxImage.addEventListener(
    "pointerdown",
    (event) => {

      if (
        event.pointerType !==
        "touch"
      ) {
        return;
      }


      touchStartX =
        event.clientX;


      touchStartY =
        event.clientY;

    }
  );


  lightboxImage.addEventListener(
    "pointerup",
    (event) => {

      if (

        event.pointerType !==
        "touch" ||

        touchStartX === null ||

        touchStartY === null

      ) {
        return;
      }


      const deltaX =
        event.clientX -
        touchStartX;


      const deltaY =
        event.clientY -
        touchStartY;


      touchStartX =
        null;


      touchStartY =
        null;


      /*
        Ignore tiny movements
        and vertical scrolling.
      */

      if (

        Math.abs(deltaX) <
        50 ||

        Math.abs(deltaX) <=
        Math.abs(deltaY)

      ) {
        return;
      }


      if (
        deltaX < 0
      ) {

        showNextImage();

      }

      else {

        showPreviousImage();

      }

    }
  );

}


/* =====================================================
   13. KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {


    /* MOBILE MENU ESCAPE */

    if (
      event.key === "Escape" &&
      navMenu &&
      navMenu.classList.contains(
        "active"
      )
    ) {

      event.preventDefault();

      closeMenu();

      navToggle.focus();

      return;

    }


    /* LIGHTBOX */

    if (

      !lightboxReady ||

      !lightbox.classList.contains(
        "active"
      )

    ) {

      return;

    }


    if (
      event.key ===
      "Escape"
    ) {

      event.preventDefault();

      closeLightbox();

      return;

    }


    if (
      event.key ===
      "ArrowRight"
    ) {

      event.preventDefault();

      showNextImage();

      return;

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      event.preventDefault();

      showPreviousImage();

      return;

    }


    trapFocus(
      event
    );

  }
);