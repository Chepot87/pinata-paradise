/* =====================================================
   PIÑATA PARADISE
   Main JavaScript
===================================================== */


/* =====================================================
   1. HERO PRODUCT TILT
===================================================== */

const heroProductCard =
  document.getElementById("hero-product-card");

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
         Only use tilt with an actual mouse.

         Mobile touch does not need this.
      */

      if (
        event.pointerType !== "mouse"
      ) {
        return;
      }


      const rect =
        heroProductCard.getBoundingClientRect();


      const mouseX =
        event.clientX - rect.left;

      const mouseY =
        event.clientY - rect.top;


      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;


      const rotateY =
        ((mouseX - centerX) / centerX) * 4;


      const rotateX =
        -((mouseY - centerY) / centerY) * 4;


      heroProductCard.style.setProperty(
        "--tilt-x",
        `${rotateX}deg`
      );


      heroProductCard.style.setProperty(
        "--tilt-y",
        `${rotateY}deg`
      );

    }
  );


  heroProductCard.addEventListener(
    "pointerleave",
    () => {

      heroProductCard.style.setProperty(
        "--tilt-x",
        "0deg"
      );


      heroProductCard.style.setProperty(
        "--tilt-y",
        "0deg"
      );

    }
  );

}



/* =====================================================
   2. GALLERY LIGHTBOX
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



let currentIndex = 0;

let lastFocusedElement = null;


/* =====================================================
   3. OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

  if (
    !lightbox ||
    !galleryCards.length
  ) {
    return;
  }


  currentIndex =
    index;


  lastFocusedElement =
    document.activeElement;


  updateLightbox();


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


  setTimeout(
    () => {

      if (
        lightboxClose
      ) {
        lightboxClose.focus();
      }

    },
    50
  );

}


/* =====================================================
   4. CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

  if (
    !lightbox
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
  ) {
    lastFocusedElement.focus();
  }

}


/* =====================================================
   5. UPDATE CONTENT
===================================================== */

function updateLightbox() {

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
    card.dataset.image;


  const title =
    card.dataset.title;


  const description =
    card.dataset.description;


  lightboxImage.src =
    image;


  lightboxImage.alt =
    title
      ? `Piñata ${title}`
      : "Diseño de piñata";


  lightboxTitle.textContent =
    title ||
    "Piñata personalizada";


  lightboxDescription.textContent =
    description ||
    "";


  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleryCards.length}`;

}


/* =====================================================
   6. NEXT IMAGE
===================================================== */

function showNextImage() {

  currentIndex++;


  if (
    currentIndex >=
    galleryCards.length
  ) {

    currentIndex =
      0;

  }


  updateLightbox();

}


/* =====================================================
   7. PREVIOUS IMAGE
===================================================== */

function showPreviousImage() {

  currentIndex--;


  if (
    currentIndex < 0
  ) {

    currentIndex =
      galleryCards.length - 1;

  }


  updateLightbox();

}


/* =====================================================
   8. CARD EVENTS
===================================================== */

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


/* =====================================================
   9. LIGHTBOX BUTTON EVENTS
===================================================== */

if (
  lightboxClose
) {

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

}


if (
  lightboxNext
) {

  lightboxNext.addEventListener(
    "click",
    showNextImage
  );

}


if (
  lightboxPrev
) {

  lightboxPrev.addEventListener(
    "click",
    showPreviousImage
  );

}


if (
  lightboxBackdrop
) {

  lightboxBackdrop.addEventListener(
    "click",
    closeLightbox
  );

}


/* =====================================================
   10. KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !lightbox ||
      !lightbox.classList.contains(
        "active"
      )
    ) {
      return;
    }


    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }


    if (
      event.key === "ArrowRight"
    ) {

      showNextImage();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      showPreviousImage();

    }

  }
);