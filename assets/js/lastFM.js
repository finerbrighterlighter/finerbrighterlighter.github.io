function lastFM_request(method, username, API_key, number, elementID) {
	var lastFMurl = 'https://ws.audioscrobbler.com/2.0/?method=' + method + '&user=' + username + '&api_key=' + API_key + '&limit=' + number + '&format=json';
	var element   = document.getElementById(elementID);
	var xmlhttp   = new XMLHttpRequest();

	xmlhttp.open('GET', lastFMurl, true); // begins request to Last.FM

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {			// When Last.FM is ready,
			if(xmlhttp.status == 200) {			// And we have text,
				var obj = JSON.parse(xmlhttp.responseText);
				// console.log(obj);

				if (method == 'user.getrecenttracks') {
					var total = obj.recenttracks['\@attr'].total;

					for (i = 0; i < number; i++) {	// Loop through responses
						var track   = obj.recenttracks.track[i]; // references this specific track
						// console.log(track);
						// fetches data from track
						var artistName = track.artist['\#text'];
						var albumName  = track.album['\#text'];
						var songName   = track.name;
						var songURL    = track.url;

						// prints link to song with artist and song name
						element.innerHTML +=  '<li>'
						
						element.innerHTML += '<a href="' + songURL + '" target="_blank" rel="noreferrer noopener">' + artistName + ' - ' + songName + '</a> ';

						if (track['\@attr'] && track['\@attr'].nowplaying !== ''){ 
							element.innerHTML += '&nbsp&nbsp&nbsp<img src="/assets/general/scrobbling.gif" alt="Now Playing" title="Now Playing" />'
						
						element.innerHTML += '</li>'}
					}
				} else if (method == 'user.gettopartists') {
					for (i = 0; i < number; i++) {
						var artist = obj.topartists.artist[i]; // references this specific artist
						// console.log(artist);
						element.innerHTML += "<img src='" + artist.image[1]["#text"] + "' alt='" + artist.name + "' />";
						element.innerHTML += "<a href='" + artist.url + "' target='_blank' rel='noreferrer noopener'>" + artist.name + "</a> with " + artist.playcount + " plays.<br/>";
					}
				}
			 }
		}
	};
	xmlhttp.send(null); // Close connection
}

setInterval(lastFM_request('user.getrecenttracks', 'fibrili', 'c0674923fe24ec9a2ec6b60ef3d73ff3', '5', 'recenttracks'), 5000);
setInterval(lastFM_request('user.getrecenttracks', 'fibrili', 'c0674923fe24ec9a2ec6b60ef3d73ff3', '1', 'lasttrack'), 5000);