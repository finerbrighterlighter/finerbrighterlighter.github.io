function getunsplash(username, accessKey, number, elementID){
	var element   = document.getElementById(elementID);
	fetch(`https://api.unsplash.com/users/${username}/photos?per_page=10`, {
  	headers: {
  		Authorization: `Client-ID ${accessKey}`,
  	},
	})
	.then((response) => response.json())
		.then((data) => {
			const time = data.map((photo) => photo.created_at);
			const unsplashUrls = data.map((photo) => photo.links.html);
			const photoUrls = data.map((photo) => photo.urls.thumb);
			for (i = 0; i < number; i++) {
				element.innerHTML += "<a href='" + unsplashUrls[i] + "' target='_blank' rel='noreferrer noopener'><img src='" + photoUrls[i] + "' title='" + time[i].split(/T/)[0] + "' alt='" +  time[i].split(/T/)[0]  + "';/>";
				}
			})
	.catch((error) => {
		console.error("Error fetching data from Unsplash API:", error);
		})
	}

setInterval(getunsplash("finerbrighterlighter", "bQGcIoNwvjNVym1Dr-50ReObTxnIU_D4_oMy6XgRIaM", 20, "latestimage"), 5000);

