function getTime(elementID, timezone, format, value) {
  element = document.getElementById(elementID);
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

setInterval(getTime("timezone", "Asia/Bangkok", true, "timezone"), 1000);
setInterval(getTime("current_time", "Asia/Bangkok", true, "CurTime"), 1000); // Refresh time 

