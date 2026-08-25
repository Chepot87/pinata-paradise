/* =====================================================
   PIÑATA PARADISE
   Main JavaScript
===================================================== */


/* =====================================================
   HERO PIÑATA
===================================================== */

const pinata = document.getElementById('pinata');

const badge = document.getElementById('surprise-badge');

const HITS_NEEDED = 3;

let hits = 0;

let broken = false;


/* =====================
   PIÑATA CLICK
===================== */

if (pinata) {

  pinata.addEventListener('click', () => {

    if (broken) return;

    hits++;

    if (hits < HITS_NEEDED) {

      pinata.classList.remove('swing');

      /*
        Forces the browser to recalculate layout
        so the animation can restart
      */

      void pinata.offsetWidth;

      pinata.classList.add('swing');

    } else {

      breakPinata();

    }

  });

}


/* =====================
   BREAK PIÑATA
===================== */

function breakPinata() {

  broken = true;

  pinata.classList.add('broken');

  launchConfetti();

  setTimeout(() => {

    pinata.style.visibility = 'hidden';

    badge.classList.remove('hidden');

  }, 350);

}


/* =====================
   CONFETTI
===================== */

function launchConfetti() {

  const colors = [
    '#FF6B4A',
    '#FFC93C',
    '#0F6B65',
    '#FF3D8A'
  ];


  for (let i = 0; i < 36; i++) {

    const piece = document.createElement('div');

    piece.className = 'confetti';


    /* random horizontal position */

    piece.style.left =
      Math.random() * 100 + 'vw';


    /* random color */

    piece.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    /* random fall speed */

    piece.style.animationDuration =
      (
        Math.random() * 1.5 + 1.8
      ) + 's';


    document.body.appendChild(piece);


    /* remove confetti after animation */

    setTimeout(() => {

      piece.remove();

    }, 3500);

  }

}



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */


/* =====================
   ELEMENTS
===================== */

const galleryCards =
  Array.from(
    document.querySelectorAll('.gallery__card')
  );


const lightbox =
  document.getElementById('lightbox');


const lightboxImage =
  document.getElementById('lightbox-image');


const lightboxTitle =
  document.getElementById('lightbox-title');


const lightboxDescription =
  document.getElementById('lightbox-description');


const lightboxCounter =
  document.getElementById('lightbox-counter');


const lightboxClose =
  document.getElementById('lightbox-close');


const lightboxPrev =
  document.getElementById('lightbox-prev');


const lightboxNext =
  document.getElementById('lightbox-next');


const lightboxBackdrop =
  document.querySelector('.lightbox__backdrop');



/* =====================
   LIGHTBOX STATE
===================== */

let currentIndex = 0;

let lastFocusedElement = null;



/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

  if (!lightbox || !galleryCards.length) {
    return;
  }


  currentIndex = index;


  lastFocusedElement =
    document.activeElement;


  updateLightbox();


  lightbox.classList.add('active');


  lightbox.setAttribute(
    'aria-hidden',
    'false'
  );


  document.body.classList.add(
    'lightbox-open'
  );


  /*
    Small timeout lets the lightbox appear
    before moving keyboard focus
  */

  setTimeout(() => {

    lightboxClose.focus();

  }, 50);

}



/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

  if (!lightbox) {
    return;
  }


  lightbox.classList.remove('active');


  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.classList.remove(
    'lightbox-open'
  );


  /*
    Return keyboard focus
    to the gallery item that opened it
  */

  if (lastFocusedElement) {

    lastFocusedElement.focus();

  }

}



/* =====================================================
   UPDATE LIGHTBOX CONTENT
===================================================== */

function updateLightbox() {

  const card =
    galleryCards[currentIndex];


  if (!card) {
    return;
  }


  const image =
    card.dataset.image;


  const title =
    card.dataset.title;


  const description =
    card.dataset.description;


  /*
    Update image
  */

  lightboxImage.src = image;

  lightboxImage.alt =
    title
      ? `Piñata ${title}`
      : 'Diseño de piñata';


  /*
    Update text
  */

  lightboxTitle.textContent =
    title || 'Piñata personalizada';


  lightboxDescription.textContent =
    description || '';


  /*
    Update counter
  */

  lightboxCounter.textContent =
    `${currentIndex + 1} / ${galleryCards.length}`;

}



/* =====================================================
   NEXT IMAGE
===================================================== */

function showNextImage() {

  currentIndex++;

  if (
    currentIndex >=
    galleryCards.length
  ) {

    currentIndex = 0;

  }

  updateLightbox();

}



/* =====================================================
   PREVIOUS IMAGE
===================================================== */

function showPreviousImage() {

  currentIndex--;

  if (currentIndex < 0) {

    currentIndex =
      galleryCards.length - 1;

  }

  updateLightbox();

}



/* =====================================================
   GALLERY CARD EVENTS
===================================================== */

galleryCards.forEach(
  (card, index) => {

    card.addEventListener(
      'click',
      () => {

        openLightbox(index);

      }
    );

  }
);



/* =====================================================
   LIGHTBOX BUTTON EVENTS
===================================================== */

if (lightboxClose) {

  lightboxClose.addEventListener(
    'click',
    closeLightbox
  );

}


if (lightboxNext) {

  lightboxNext.addEventListener(
    'click',
    showNextImage
  );

}


if (lightboxPrev) {

  lightboxPrev.addEventListener(
    'click',
    showPreviousImage
  );

}



/* =====================================================
   CLOSE BY CLICKING BACKDROP
===================================================== */

if (lightboxBackdrop) {

  lightboxBackdrop.addEventListener(
    'click',
    closeLightbox
  );

}



/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
  'keydown',
  (event) => {

    /*
      Do nothing if lightbox
      is not currently open
    */

    if (
      !lightbox ||
      !lightbox.classList.contains('active')
    ) {

      return;

    }


    /* ESC closes */

    if (event.key === 'Escape') {

      closeLightbox();

    }


    /* right arrow */

    if (event.key === 'ArrowRight') {

      showNextImage();

    }


    /* left arrow */

    if (event.key === 'ArrowLeft') {

      showPreviousImage();

    }

  }
);