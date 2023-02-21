// get the div elements
const parentDiv = document.getElementById("wrapper");
const childDiv = document.getElementById("side-wrapper");
const targetElement = document.getElementById("targetElement");
targetElement.classList.add("sidebar-wrapper");

// create a media query to check for the screen width
const mediaQuery = window.matchMedia("(max-width: 767px)");

// function to move the target element based on screen width
function moveDiv() {
  if (mediaQuery.matches) {
	  childDiv.appendChild(targetElement);
  } else {
	  parentDiv.appendChild(targetElement);
    
  }
}

// call the function on load and whenever the screen width changes
moveDiv();
mediaQuery.addListener(moveDiv);
