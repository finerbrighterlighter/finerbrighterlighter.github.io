// get the div elements
const parentDiv = document.getElementById("wrapper");
const childDiv = document.getElementById("main-wrapper");
const targetElement = document.getElementById("targetElement");

// create a media query to check for the screen width
const mediaQuery = window.matchMedia("(max-width: 767px)");

// function to move the target element based on screen width
function moveDiv() {
  if (mediaQuery.matches) {
	parentDiv.appendChild(targetElement);
  } else {
    parentDiv.insertBefore(targetElement, childDiv);
  }
}

// call the function on load and whenever the screen width changes
moveDiv();
mediaQuery.addListener(moveDiv);
