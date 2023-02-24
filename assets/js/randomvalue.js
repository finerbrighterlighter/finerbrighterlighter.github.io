function updateElement_interval(elementId, valuesArray, interval, type) {
  const element = document.getElementById(elementId);

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * valuesArray.length);
    const randomValue = valuesArray[randomIndex];

    if (type === "text") {
      element.innerHTML = randomValue;
    } else if (type === "image") {
      element.src = "https://htunteza.com/assets/general/profiles/" +randomValue;
    }
  }, interval);
}

function updateElement_animation(elementId, containerId, valuesArray, animation, event) {
  const element = document.getElementById(elementId);
  const box = document.getElementById(containerId);
  const textContainer = box.parentElement;
  
  if (textContainer.scrollWidth > textContainer.clientWidth && event.animationName === "scroll-text") {
    const randomIndex = Math.floor(Math.random() * valuesArray.length);
    const randomValue = textArray[randomIndex];
    element.innerHTML = randomValue;
  } else {
    const randomIndex = Math.floor(Math.random() * valuesArray.length);
    const randomValue = textArray[randomIndex];
    element.innerHTML = randomValue;
    textElement.style.animation = "none";
  }
  
  
  box.style.animation = "scroll-text 5s linear infinite, color-animation 1s linear infinite";	  
}

const textValues = ["Let's donate blood","It's in you to give","Red with life","Life is blood; Blood is life","သွေးသည်အသက်​ အသက်သည်သွေး","Every blood donor is a hero","Give the gift of life","Safe blood for saving mothers","Thank you for saving my life","Blood connects us all","Give Blood. Give Now. Give Often","Be there for someone else","Give blood. Share life","Safe Blood For All","Safe Blood Saves Lives","Give blood and keep the world beating","Blood donation is an act of solidarity", "Join the effort and save lives","Safe Life Give Blood"];

const imageValues = ["profile (1).jfif", "profile (1).jpg", "profile (2).jpg", "profile (3).jpg", "profile (4).jpg", "profile (5).jpg", "profile (6).jpg", "profile (7).jpg", "profile (8).jpg", "profile (9).jpg", "profile (10).jpg"];

updateElement_interval("profile", imageValues, 20000, "image");

const textElement = document.getElementById("banner-group");
textElement.addEventListener("animationend", function(event) {updateElement_animation("banner", "banner-group", textValues, "scroll-text", event);});
