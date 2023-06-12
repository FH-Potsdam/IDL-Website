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