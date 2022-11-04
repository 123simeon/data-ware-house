"use strict";

const navOpen = document.querySelector(".header");
const btnNavOpen = document.querySelector(".btn-mobile-nav");
const sectionFeatures = document.querySelector("#features-section");
const btnScrollTo = document.querySelector(".hero-btn");
const bdy = document.querySelector("body");

///////////////////////////////////////
//  Open nav menu
btnNavOpen.addEventListener("click", function (e) {
  e.preventDefault();
  navOpen.classList.toggle("nav-open");
  bdy.classList.toggle("noflow");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !navOpen.classList.contains("main-nav-link")) {
    navOpen.classList.remove("nav-open");
  }
});

//////////////////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  sectionFeatures.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////
///// Page navigation
document
  .querySelector(".main-nav-list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // my own  work (removing noflow and nav open) because of nav menu open
    bdy.classList.remove("noflow");
    navOpen.classList.remove("nav-open");

    // matching strategy
    if (e.target.classList.contains("main-nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

//////////////////////////////////////////////////
// slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////////
///////sticky nav
const header = document.querySelector(".header");
const hero = document.querySelector(".hero-section");
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

heroObserver.observe(hero);

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const btnsOpenModal = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const overlay = document.querySelector('.overlay');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
