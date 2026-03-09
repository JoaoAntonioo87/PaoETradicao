// HEADER MENU
const navHeader = Array(document.querySelector(".header-nav-links"));
const eventsHeaderMenu = ["click", "touch"];

if (window.screen.availWidth < 1000) {
  navHeader.forEach((element) => {
    eventsHeaderMenu.forEach((eventName) => {
      element.addEventListener(eventName, (event) => {
        element.classList.toggle("active");
        event.stopPropagation();
      });
    });

    eventsHeaderMenu.forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        if (Array.from(navHeader[0].classList).includes("active")) {
          navHeader[0].classList.remove("active");
        }
      });
    });
  });
}

// SMOTH SCROLL

const internalLinks = document.querySelectorAll("[href^='#']");

internalLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.getElementsByClassName(
      link.getAttribute("href").replace("#", ""),
    );

    window.scroll({
      top: target[0] ? target[0].offsetTop : 0,
      behavior: "smooth",
    });
  });
});

// IMAGE INTRO
const imgsIntro = Array.from(document.querySelectorAll(".intro-img"));
const widthDevice = window.innerWidth;
let counter = 0;

setInterval(() => {
  if (counter < widthDevice * (imgsIntro.length - 1)) {
    counter = counter + widthDevice;
    imgsIntro.forEach((element) => {
      element.style.transform = `translateX(-${counter}px)`;
    });
  } else {
    imgsIntro.forEach((element) => {
      element.style.left = 0;
      counter = 0;
    });
  }
}, 3000);

// SLIDE ANIMATIONS
const slideElements = document.querySelectorAll("[data-slide]");

if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    slideElements.forEach((element) => {
      if (window.outerHeight > element.offsetTop + 50) {
        element.dataset.slide = null;
        element.style.opacity = 1;
      }
      if (window.screen.availWidth > 1200) {
        if (
          element.dataset.slide === "left" ||
          element.dataset.slide === "right"
        ) {
          element.dataset.slide = "down";
        }
      }
    });
  });
}

// Debounce scroll listener
let scrollTimeout;
window.addEventListener(
  "scroll",
  () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      slideElements.forEach((element) => {
        if (window.outerHeight + window.scrollY > element.offsetTop + 100) {
          element.classList.add("active");
        }
      });
    }, 50);
  },
  { passive: true },
);

// HANDLE ACCORDION

const accordionElement = Array.from(
  document.querySelectorAll(".differences-card"),
);

accordionElement.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("active");
  });
});

// CHANGE IMAGES SIZE

const allImgs = Array.from(document.querySelectorAll("[src$='webp']"));

allImgs.forEach((image) => {
  if (window.outerWidth < 750 && image.className == "intro-img") {
    image.outerHTML = image.outerHTML.replace("desktop", "mobile");
  }
});
