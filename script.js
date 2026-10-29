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
    document.documentElement.lang === "en" ? "Close menu" : "Cerrar menú"
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
    document.documentElement.lang === "en" ? "Open menu" : "Abrir menú"
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
    document.documentElement.lang === "en" ? `${title} piñata` : `Piñata ${title}`;


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

/* Language selection: Spanish remains the no-JavaScript default. */
(() => {
  const translations = [
  [
    ".nav__link[href=\"#inicio\"]",
    "Home"
  ],
  [
    ".nav__link[href=\"#como-funciona\"]",
    "How it works"
  ],
  [
    ".nav__link[href=\"#galeria\"]",
    "Gallery"
  ],
  [
    ".nav__link[href=\"#contacto\"]",
    "Contact"
  ],
  [
    ".hero__eyebrow",
    "100% custom piñatas · Puerto Rico · est. 2023"
  ],
  [
    ".hero__title",
    "Any idea.<br>Made into a piñata.",
    "html"
  ],
  [
    ".hero__sub",
    "From favorite characters to completely unique ideas. Each piñata is designed and handmade especially for your celebration."
  ],
  [
    ".hero__copy .btn",
    "View designs"
  ],
  [
    ".hero-product__badge",
    "Handmade"
  ],
  [
    ".hero-product__label",
    "Custom design"
  ],
  [
    ".hero__hint",
    "Designs made entirely by hand"
  ],
  [
    "#process-title",
    "How it works"
  ],
  [
    ".step:nth-child(1) h3",
    "Tell us your idea"
  ],
  [
    ".step:nth-child(1) p",
    "A character, a theme, or something completely different. Send us your inspiration on Instagram."
  ],
  [
    ".step:nth-child(2) h3",
    "We design with you"
  ],
  [
    ".step:nth-child(2) p",
    "We work out the size, colors, and details before starting your piñata."
  ],
  [
    ".step:nth-child(3) h3",
    "We build it by hand"
  ],
  [
    ".step:nth-child(3) p",
    "Every piece, fringe, and detail is carefully cut and assembled by hand."
  ],
  [
    ".step:nth-child(4) h3",
    "You celebrate"
  ],
  [
    ".step:nth-child(4) p",
    "Pick up your finished design, ready to become part of the celebration."
  ],
  [
    "#gallery-title",
    "Some of our designs"
  ],
  [
    ".gallery .section-sub",
    "Each piñata is designed and handmade especially for each celebration."
  ],
  [
    ".cta h2",
    "Ready for your piñata?"
  ],
  [
    ".cta p",
    "Send us your idea, your event date, and any references you have. We’ll help you with the design, pricing, and availability."
  ],
  [
    ".cta .btn",
    "@pinataparadisepr on Instagram"
  ],
  [
    ".nav__brand",
    "Piñata Paradise - Home",
    "aria-label"
  ],
  [
    "#nav-menu",
    "Main navigation",
    "aria-label"
  ],
  [
    ".hero-product__img",
    "Custom Stitch-inspired piñata",
    "alt"
  ],
  [
    "#lightbox-close",
    "Close image",
    "aria-label"
  ],
  [
    "#lightbox-prev",
    "Previous image",
    "aria-label"
  ],
  [
    "#lightbox-next",
    "Next image",
    "aria-label"
  ],
  [
    ".language-switch",
    "Language",
    "aria-label"
  ],
  [
    "title",
    "Piñata Paradise | Custom piñatas"
  ],
  [
    "meta[name=\"description\"]",
    "Piñata Paradise creates custom handmade piñatas for every kind of celebration.",
    "content"
  ],
  [
    ".gallery__card:nth-child(1)",
    "Fortnite GOAT",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(1)",
    "A custom piñata inspired by the Fortnite GOAT character, featuring its signature colors and details.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(1) span",
    "Fortnite GOAT"
  ],
  [
    ".gallery__card:nth-child(1) img",
    "Fortnite GOAT piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(2)",
    "Pink Flamingo",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(2)",
    "A pink flamingo piñata with a fun tropical design full of personality.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(2) span",
    "Pink Flamingo"
  ],
  [
    ".gallery__card:nth-child(2) img",
    "Pink Flamingo piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(3)",
    "Roblox Character",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(3)",
    "A custom piñata inspired by a Roblox character, with details and colors based on the original design.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(3) span",
    "Roblox Character"
  ],
  [
    ".gallery__card:nth-child(3) img",
    "Roblox Character piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(4)",
    "Luca Paguro",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(4)",
    "A piñata inspired by Luca Paguro, with a colorful design that captures the character’s cheerful style.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(4) span",
    "Luca Paguro"
  ],
  [
    ".gallery__card:nth-child(4) img",
    "Luca Paguro piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(5)",
    "Kirby",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(5)",
    "A Kirby-inspired piñata with his classic pink, round, instantly recognizable design.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(5) span",
    "Kirby"
  ],
  [
    ".gallery__card:nth-child(5) img",
    "Kirby piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(6)",
    "Frida Kahlo",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(6)",
    "An artistic piñata inspired by Frida Kahlo, with floral details and visual elements reflecting her style.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(6) span",
    "Frida Kahlo"
  ],
  [
    ".gallery__card:nth-child(6) img",
    "Frida Kahlo piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(7)",
    "Hennessy Bottle",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(7)",
    "A custom Hennessy bottle piñata, designed with details that recreate the original bottle.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(7) span",
    "Hennessy Bottle"
  ],
  [
    ".gallery__card:nth-child(7) img",
    "Hennessy Bottle piñata",
    "alt"
  ],
  [
    ".gallery__card:nth-child(8)",
    "Stitch",
    "data-title"
  ],
  [
    ".gallery__card:nth-child(8)",
    "A Stitch-inspired piñata with his signature blue design and a fun, adorable expression.",
    "data-description"
  ],
  [
    ".gallery__card:nth-child(8) span",
    "Stitch"
  ],
  [
    ".gallery__card:nth-child(8) img",
    "Stitch piñata",
    "alt"
  ]
];
  const bindings = translations.map(([selector, english, attribute = "text"]) => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const spanish = attribute === "text" ? element.textContent
      : attribute === "html" ? element.innerHTML : element.getAttribute(attribute);
    return { element, english, spanish, attribute };
  }).filter(Boolean);

  function setLanguage(language) {
    const lang = language === "en" ? "en" : "es";
    document.documentElement.lang = lang;
    bindings.forEach(({element, english, spanish, attribute}) => {
      const value = lang === "en" ? english : spanish;
      if (attribute === "text") element.textContent = value;
      else if (attribute === "html") element.innerHTML = value;
      else element.setAttribute(attribute, value);
    });
    document.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === lang));
    });
    if (navToggle) {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", lang === "en"
        ? (open ? "Close menu" : "Open menu") : (open ? "Cerrar menú" : "Abrir menú"));
    }
    if (lightbox && lightbox.classList.contains("active")) updateLightbox();
    try { localStorage.setItem("pinata-paradise-language", lang); } catch (_) {
      // Language switching still works when browser storage is unavailable.
    }
  }
  let savedLanguage = "es";
  try { savedLanguage = localStorage.getItem("pinata-paradise-language") || "es"; } catch (_) {}
  setLanguage(savedLanguage);
  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  document.querySelector(".language-switch").hidden = false;
})();
