/* const ConsoleLogger = require("@11ty/eleventy/src/Util/ConsoleLogger");

let lastKnownScrollPosition = 0;
let ticking = false;

function header(scrollPos) {
  var header = document.querySelector('header');
  if (header) {
    if (scrollPos > 540) {
      if (header.className === "invert") {
        header.className = "";
        setTimeout(function() {
          document.querySelector('#logo').style.display = 'block';
        }, 500);
      }
    } else {
      if (header.className !== "invert") {
        header.className = "invert";
      }
    }
  }
}

document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      header(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
}); 
*/



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
      start: "top center",
      end: "bottom 100px",
      markers: false,
      scrub: 2,
      toggleActions: "restart pause reverse reset"
    },
    left: "0%"
  });
});

sections2.forEach((section2) => {
  gsap.to(section2, {
    scrollTrigger: {
      trigger: section2,
      start: "top center",
      end: "bottom 100px",
      markers: false,
      scrub: 2,
      toggleActions: "restart pause reverse reset"
    },
    left: "-50%"
  });
});

console.log("Läuft");

// Laufschrift Ende


// Mobile Menu

const mainNavButton = document.getElementById('mainNavButton');
const htmlElement = document.documentElement;
const bodyElement = document.body;
const mainElement = document.getElementsByClassName("main");

mainNavButton.addEventListener('click', toggleMainMenü);
function toggleMainMenü(e) {
  let _this = e.currentTarget;
  let expanded = _this.getAttribute('aria-expanded') === 'true' || false;
  let menu = _this.nextElementSibling;
  _this.setAttribute('aria-expanded', !expanded);
  htmlElement.classList.toggle('is-mobile-main-nav-open');
  bodyElement.classList.toggle('is-mobile-main-nav-open');
  mainElement[0].classList.toggle('is-mobile-main-nav-open');
  window.scrollTo(0, 0);
}


// Show more

if(document.getElementById('button-projects')){
const showMoreProjects = document.getElementById('button-projects');
const previewProjects = document.getElementsByClassName("expand-projects");


showMoreProjects.onclick = function () {
  previewProjects[0].classList.toggle('preview');
showMoreProjects.style.display = "none";
//this.style.color="#0000ff";
}
}


if(document.getElementById('button-pubs')){
const showMorePubs = document.getElementById('button-pubs');
const previewPubs = document.getElementsByClassName("expand-pubs");

showMorePubs.onclick = function () {
  previewPubs[0].classList.toggle('preview');
  showMorePubs.style.display = "none";

}

}








