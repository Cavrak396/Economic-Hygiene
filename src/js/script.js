"use strict";

// Hamburger menu props
const hamburgerBtn = document.querySelector(".js-hamburger-open");
const menuClose = document.querySelector(".js-close");
const menuWindow = document.querySelector(".js-nav");
const closingCloud = () => {
  menuWindow.classList.remove("active");
  document.body.style.overflow = "auto";
};

hamburgerBtn.addEventListener("click", () => {
  menuWindow.classList.add("active");
  document.body.style.overflow = "hidden";
});

menuClose.addEventListener("click", closingCloud);

// Swiper
document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".js-swiper");
  let isDragging = false;
  let startX, currentX;

  swiperContainer.addEventListener("mousedown", handleDragStart);
  swiperContainer.addEventListener("mousemove", handleDragging);
  document.addEventListener("mouseup", handleDragEnd);
  swiperContainer.addEventListener("mouseleave", handleDragEnd);

  swiperContainer.addEventListener("touchstart", handleDragStart, {
    passive: false,
  });
  swiperContainer.addEventListener("touchmove", handleDragging, {
    passive: false,
  });
  document.addEventListener("touchend", handleDragEnd);

  function handleDragStart(event) {
    event.preventDefault();
    isDragging = true;
    startX =
      event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
    currentX = startX;
  }

  function handleDragging(event) {
    event.preventDefault();
    if (!isDragging) return;
    let deltaX =
      event.type === "touchmove"
        ? event.touches[0].clientX - currentX
        : event.clientX - currentX;

    swiperContainer.scrollLeft -= deltaX;

    currentX =
      event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
  }

  function handleDragEnd() {
    isDragging = false;
  }
});

// Scroll to section
const navLinks = document.querySelectorAll(".js-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetLinkClass = link.getAttribute("href").substring(1);
    const targetSection = document.querySelector("." + targetLinkClass);
    if (targetSection && targetSection.classList.contains(targetLinkClass)) {
      targetSection.scrollIntoView({ behavior: "smooth" });
      closingCloud();
    }
  });
});

// Counting numbers
document.addEventListener("DOMContentLoaded", function () {
  const targets = [
    { selector: ".js-statistic-clients", targetValue: 160 },
    { selector: ".js-statistic-team", targetValue: 10 },
    { selector: ".js-statistic-days", targetValue: 365 },
  ];

  function updateCountdown(target) {
    const element = document.querySelector(target.selector);
    if (element) {
      const currentValue = parseInt(element.textContent, 10);
      if (currentValue < target.targetValue) {
        const newValue = Math.min(currentValue + 1, target.targetValue);
        element.textContent = newValue;
        if (newValue < target.targetValue) {
          requestAnimationFrame(() => updateCountdown(target));
        }
      }
    }
  }

  function animateCountdown(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        targets.forEach(updateCountdown);
        observer.unobserve(entry.target);
      }
    });
  }

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const countdownObserver = new IntersectionObserver(
    animateCountdown,
    observerOptions
  );

  targets.forEach((target) => {
    const element = document.querySelector(target.selector);
    if (element) {
      countdownObserver.observe(element);
    }
  });
});
