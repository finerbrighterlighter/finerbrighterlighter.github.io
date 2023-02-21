// get the div elements
const parentDiv = document.getElementById("parentDiv");
const childDiv2 = document.getElementById("childDiv2");
const childDiv3 = document.getElementById("childDiv1");
const targetElement = document.getElementById("targetElement");
targetElement.classList.add("sidebar-wrapper");

// create a media query to check for the screen width
const mediaQuery = window.matchMedia("(max-width: 767px)");

// function to move the target element based on screen width
function moveDiv() {
  if (mediaQuery.matches) {
	  parentDiv.insertBefore(targetElement, childDiv3);
  } else{
	  childDiv2.appendChild(targetElement);
  } 
}

// call the function on load and whenever the screen width changes
moveDiv();
mediaQuery.addListener(moveDiv);
