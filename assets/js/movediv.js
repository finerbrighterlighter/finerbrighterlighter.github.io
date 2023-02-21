// get the div elements
const parentDiv = document.getElementById("parentDiv");
const childDiv1 = document.getElementById("childDiv1");
const targetElement = document.getElementById("targetElement");
targetElement.classList.add("sidebar-wrapper");

// create a media query to check for the screen width
const mediaQuery = window.matchMedia("(max-width: 767px)");

// function to move the target element based on screen width
function moveDiv() {
  if (mediaQuery.matches) {
	  parentDiv.insertAdjacentElement("afterend", targetElement);
  } else{
	  childDiv2.appendChild(targetElement);
  } 
}

// call the function on load and whenever the screen width changes
moveDiv();
mediaQuery.addListener(moveDiv);
