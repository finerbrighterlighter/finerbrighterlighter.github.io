function updateElement_interval(elementId, valuesArray, interval, type) {
  const element = document.getElementById(elementId);

  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * valuesArray.length);
    const randomValue = valuesArray[randomIndex];

    if (type === "text") {
      element.innerText = randomValue;
    } else if (type === "image") {
      element.src =
        "https://htunteza.com/assets/general/profiles/" + randomValue;
    }
  }, interval);
}

const textValues = [
  "Let's donate blood",
  "It's in you to give",
  "Red with life",
  "Life is blood; Blood is life",
  "သွေးသည်အသက်​ အသက်သည်သွေး",
  "Every blood donor is a hero",
  "Give the gift of life",
  "Safe blood for saving mothers",
  "Thank you for saving my life",
  "Blood connects us all",
  "Give Blood. Give Now. Give Often",
  "Be there for someone else",
  "Give blood. Share life",
  "Safe Blood For All",
  "Safe Blood Saves Lives",
  "Give blood and keep the world beating",
  "Blood donation is an act of solidarity",
  "Join the effort and save lives",
  "Safe Life Give Blood",
];

const imageValues = [
  "profile (1).jfif",
  "profile (1).jpg",
  "profile (2).jpg",
  "profile (3).jpg",
  "profile (4).jpg",
  "profile (5).jpg",
  "profile (6).jpg",
  "profile (7).jpg",
  "profile (8).jpg",
  "profile (9).jpg",
  "profile (10).jpg",
];

updateElement_interval("profile", imageValues, 20000, "image");
updateElement_interval("banner", textValues, 5000, "text");
