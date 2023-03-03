function getTime(elementID, timezone, format) {
	element = document.getElementById(elementID)
 	const date = new Date();
	const options = {
		timeZone: timezone,
		hour12: format,
		hour: 'numeric',
		minute: 'numeric'};
	const formattedTime = date.toLocaleString('en-US', options);
	element.innerText = formattedTime;
	}

setInterval(getTime("current_time", "Asia/Bangkok", true), 1000); // Refresh time every second