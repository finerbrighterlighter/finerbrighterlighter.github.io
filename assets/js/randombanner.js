function randomtext() {
    var randomtxt = [
			"Let's donate blood",
			"It's in you to give",
			"Red with life",
			"Life is blood; Blood is life",
			"သွေးသည်အသက်​ အသက်သည်သွေး",
			"Every blood donor is a hero",
			"Give the gift of life : donate blood",
			"Safe blood for saving mothers",
			"Thank you for saving my life",
			"Blood connects us all",
			"Give Blood. Give Now. Give Often",
			"Be there for someone else. Give blood. Share life",
			"Safe Blood For All",
			"Safe Blood Saves Lives",
			"Give blood and keep the world beating",
			"Blood donation is an act of solidarity. Join the effort and save lives",
	    		"Safe Life Give Blood"
			];
    return randomtxt[Math.floor((Math.random() * 5.10))];
}

document.getElementById("banner").innerHTML = randomtext();