import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Laufschrift Anfang

// gsap.to()... infinity and beyond!
// For more check out greensock.com
gsap.registerPlugin(ScrollTrigger);
var sections = gsap.utils.toArray(".scroll1");
var sections2 = gsap.utils.toArray(".scroll2");

sections.forEach((section) => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom 50px",
      markers: false,
      scrub: 2,
      toggleActions: "restart pause reverse reset",
    },
    left: "0%",
  });
});

sections2.forEach((section2) => {
  gsap.to(section2, {
    scrollTrigger: {
      trigger: section2,
      start: "top bottom",
      end: "bottom 50px",
      markers: false,
      scrub: 2,
      toggleActions: "restart pause reverse reset",
    },
    left: "-50%",
  });
});

// console.log("Läuft");

// Laufschrift Ende

// Mobile Menu

const mainNavButton = document.getElementById("mainNavButton");
const menulist = document.getElementById("menu-list");
const htmlElement = document.documentElement;
const bodyElement = document.body;
const mainElement = document.getElementsByClassName("main");

mainNavButton.addEventListener("click", toggleMainMenu);
function toggleMainMenu(e) {
  let _this = e.currentTarget;
  let expanded = _this.getAttribute("aria-expanded") === "true" || false;
  let menu = _this.nextElementSibling;
  _this.setAttribute("aria-expanded", !expanded);
  htmlElement.classList.toggle("is-mobile-main-nav-open");
  bodyElement.classList.toggle("is-mobile-main-nav-open");
  mainElement[0].classList.toggle("is-mobile-main-nav-open");
  window.scrollTo(0, 0);

  if (menulist.hasAttribute("hidden")) {
    menulist.removeAttribute("hidden");
  } else {
    menulist.setAttribute("hidden", true);
  }
}

// Show more

if (document.getElementById("button-projects")) {
  const showMoreProjects = document.getElementById("button-projects");
  const previewProjects = document.getElementsByClassName("expand-projects");

  showMoreProjects.onclick = function () {
    previewProjects[0].classList.toggle("preview");
    showMoreProjects.style.display = "none";
    //this.style.color="#0000ff";
  };
}

if (document.getElementById("button-pubs")) {
  const showMorePubs = document.getElementById("button-pubs");
  const previewPubs = document.getElementsByClassName("expand-pubs");

  showMorePubs.onclick = function () {
    previewPubs[0].classList.toggle("preview");
    showMorePubs.style.display = "none";
  };
}

// SLIDESHOW

const initializeSlider = (sliderContainer) => {
  const slider = sliderContainer.querySelector(".slider");
  const images = Array.from(slider.children);
  const prevButton = sliderContainer.querySelector(".prev");
  const nextButton = sliderContainer.querySelector(".next");

  let currentIndex = images.length; // Start at the first set of real images

  // Clone all images and append them to the start and end of the slider
  const cloneImages = () => {
    const firstCloneSet = images.map((img) => img.cloneNode(true));
    const lastCloneSet = images.map((img) => img.cloneNode(true));

    firstCloneSet.forEach((clone) => slider.appendChild(clone));
    lastCloneSet.reverse().forEach((clone) => slider.prepend(clone));
  };

  // Function to update image widths dynamically
  const updateImageWidths = () => {
    // const windowWidth = window.innerWidth;
    // const allImages = Array.from(slider.children);
    // allImages.forEach((img) => {
    //   img.style.width = `${windowWidth}px`; // Make image width equal to the window's width
    // });
  };

  // Function to calculate the slider's transform offset
  const getTransformOffset = (index) => {
    const imageWidth = slider.children[0].offsetWidth + 40; // margin
    const containerWidth = sliderContainer.offsetWidth;
    return containerWidth / 2 - imageWidth / 2 - index * imageWidth;
  };

  // Set initial position to center the first real image
  const initializeSliderPosition = () => {
    updateImageWidths();
    slider.style.transition = "none";
    const offset = getTransformOffset(currentIndex);
    slider.style.transform = `translateX(${offset}px)`;
  };

  // Function to move the slider
  const slideToIndex = (index) => {
    slider.style.transition = "transform 0.5s ease";
    const offset = getTransformOffset(index);
    slider.style.transform = `translateX(${offset}px)`;
  };

  // Function to handle wrapping around
  const handleBoundary = () => {
    slider.style.transition = "none"; // Disable transition for instant jump
    const totalImages = slider.children.length / 3; // Total number of images in one set
    if (currentIndex < totalImages) {
      // If we're before the first real set, jump to the last real set
      currentIndex += totalImages;
      slider.style.transform = `translateX(${getTransformOffset(currentIndex)}px)`;
    } else if (currentIndex >= totalImages * 2) {
      // If we're after the last real set, jump to the first real set
      currentIndex -= totalImages;
      slider.style.transform = `translateX(${getTransformOffset(currentIndex)}px)`;
    }
  };

  // Handle the Next button
  nextButton.addEventListener("click", () => {
    currentIndex++;
    slideToIndex(currentIndex);
    setTimeout(handleBoundary, 500); // Check boundary after sliding
  });

  // Handle the Previous button
  prevButton.addEventListener("click", () => {
    currentIndex--;
    slideToIndex(currentIndex);
    setTimeout(handleBoundary, 500); // Check boundary after sliding
  });

  // Update widths and reset position on window resize
  window.addEventListener("resize", initializeSliderPosition);

  // Clone images, initialize slider
  cloneImages();
  initializeSliderPosition();
};

// Initialize all sliders on the page
const sliderContainers = document.querySelectorAll(".slider-container");
sliderContainers.forEach((sliderContainer) => initializeSlider(sliderContainer));
