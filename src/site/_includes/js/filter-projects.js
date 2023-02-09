const projectcards = document.getElementsByClassName("project-container");
const buttonGroups = document.querySelectorAll('.js-filter-button-group');
var theme, service, art;

if(buttonGroups.length) {
  buttonGroups.forEach((buttonGroup) => {
    buttonGroup.addEventListener('click', function(event) {
      const isButton = event.target.classList.contains('js-button');
      if ( !isButton ) {
        return;
      }
      if(event.target.classList.contains('selectTheme')) {
        themeType(event.target.value)
      }
      if(event.target.classList.contains('selectService')) {
        serviceType(event.target.value)  
      }
      if(event.target.classList.contains('selectArt')) {
        artType(event.target.value)        
      }
    });
  });

  whatsleft(".selectTheme");
  whatsleft(".selectArt");
  whatsleft(".selectService");
}

function whatsleft(filterGroup) {
  /* Filter auschalten, wenn es keine übrigen Projekte gibt */

  const cardtags = [];
  var x = 0;

  Array.from(projectcards).forEach((projectcards) => {
    if (!projectcards.classList.contains("hidden")) {
      // console.log(projectcards.classList.length);
      for (var i = 1; i < projectcards.classList.length; i++) {
        cardtags[x] = projectcards.classList[i];
        x++;
      }

      // console.log(cardtags);
    }
  });

  const themeButtons = document.querySelectorAll(filterGroup);

  Array.from(themeButtons).forEach((themeButtons) => {
    if (!cardtags.includes(themeButtons.value)) {
      if (!themeButtons.value == "") {
        /*themeButtons.classList.add("disabled");*/
        themeButtons.setAttribute("disabled", "");
      }
    } else {
      themeButtons.removeAttribute("disabled");
    }
  });
}



function themeType(buttonValue) {
  // console.log(buttonValue);
  theme = buttonValue;

  const themeButtons = document.querySelectorAll(".selectTheme");

  themeButtons.forEach((themeButtons) => {
    themeButtons.classList.remove("active");
    if (themeButtons.value == theme) {
      themeButtons.classList.add("active");
    }
  });

  display(theme, service, art);
  whatsleft(".selectService");
  whatsleft(".selectArt");
}

function serviceType(buttonValue) {
  // console.log(buttonValue);
  service = buttonValue;

  const serviceButtons = document.querySelectorAll(".selectService");

  serviceButtons.forEach((serviceButtons) => {
    serviceButtons.classList.remove("active");
    if (serviceButtons.value == service) {
      serviceButtons.classList.add("active");
    }
  });

  display(theme, service, art);
  whatsleft(".selectTheme");
  whatsleft(".selectArt");
}

function artType(buttonValue) {
  // console.log(buttonValue);
  art = buttonValue;

  const artButtons = document.querySelectorAll(".selectArt");

  artButtons.forEach((artButtons) => {
    artButtons.classList.remove("active");
    if (artButtons.value == art) {
      artButtons.classList.add("active");
    }
  });

  display(theme, service, art);
  whatsleft(".selectService");
  whatsleft(".selectTheme");
}

function display(theme, service, art) {
  Array.from(projectcards).forEach((projectcards) =>
    projectcards.classList.remove("hidden")
  );

  if (theme) {
    Array.from(projectcards)
      .filter((projectcards) => !projectcards.classList.contains(theme))
      .forEach((projectcards) => projectcards.classList.add("hidden"));
  }

  if (service) {
    Array.from(projectcards)
      .filter((projectcards) => !projectcards.classList.contains(service))
      .forEach((projectcards) => projectcards.classList.add("hidden"));
  }

  if (art) {
    Array.from(projectcards)
      .filter((projectcards) => !projectcards.classList.contains(art))
      .forEach((projectcards) => projectcards.classList.add("hidden"));
  }
}