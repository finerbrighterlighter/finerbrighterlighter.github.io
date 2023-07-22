function getTime(elementID, format, value) {
  element = document.getElementById(elementID);
  var timezone = element.value;
  const date = new Date();
  const options = {
    timeZone: timezone,
    timeZoneName: "long",
    hour12: format,
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTime = date.toLocaleString("en-US", options);
  if (value=="CurTime"){
  	var result = formattedTime.split("M")[0] + "M";
  } else if (value=="timezone"){
  	var result = formattedTime.split("M")[1];
  }
  element.innerText = result;
}

getTime("timezone", true, "timezone");
setInterval(getTime("current_time", true, "CurTime"), 1000); // Refresh time 

