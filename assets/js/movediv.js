// get the div elements
const hide_page = "https://htunteza.com/posts";
const parentDiv = document.getElementById("parentDiv");
const childDiv1 = document.getElementById("childDiv1");
const targetElement = document.getElementById("targetElement");
targetElement.classList.add("sidebar-wrapper");

// create a media query to check for the screen width
const mediaQuery = window.matchMedia("(max-width: 767px)");

// function to move the target element based on screen width
function moveDiv() {
  if (mediaQuery.matches) {
	  const existingHeader = targetElement.querySelector("#interest");
	  if (!existingHeader){
		  const header = document.createElement("div");
		  header.setAttribute("id", "interest");
		  header.style.padding = "10px"
		  header.style.paddingLeft = "30px"
		  header.innerHTML =  '<h3 style="font-weight: 500;"><span class="fa-stack fa-xs" style="margin-right: 5px;"> <i class="fas fa-circle fa-stack-2x"></i> <i class="fas fa-headphones fa-stack-1x fa-inverse" style="color: #374e59;"></i> </span>INTERESTS</h3>'
		  targetElement.insertAdjacentElement("afterbegin", header);
	  }  
	  if (!window.location.href.startsWith(hide_page)){
		  targetElement.style.display = "block"
		  parentDiv.insertAdjacentElement("afterend", targetElement);
	  } else{
		  targetElement.style.display = "none"
	  }
	  
  } else{
	  const existingHeader = targetElement.querySelector("#interest");
	  if (existingHeader) {
		  targetElement.removeChild(existingHeader);
	  }
	  targetElement.style.display = "block"
	  childDiv1.appendChild(targetElement);
  } 
}


// call the function on load and whenever the screen width changes
moveDiv();
mediaQuery.addListener(moveDiv);



