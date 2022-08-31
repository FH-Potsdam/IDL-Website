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