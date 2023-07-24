function getTime(elementID, format) {
  element = document.getElementById(elementID);
  var timezone = element.textContent;
  const date = new Date();
  const options = {
    timeZone: timezone,
    timeZoneName: "long",
    hour12: format,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTime = date.toLocaleString("en-US", options);
  console.log(formattedTime)
  element.textContent = formattedTime.split("M")[1] + " (" + formattedTime.split("M")[0] + "M)";
}

setInterval(getTime("timezone", true), 1000); // Refresh time 