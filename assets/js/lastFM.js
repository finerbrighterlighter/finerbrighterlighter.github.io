function lastFM_request(method, username, API_key, number, elementID) {
  var lastFMurl =
    "https://ws.audioscrobbler.com/2.0/?method=" +
    method +
    "&user=" +
    username +
    "&api_key=" +
    API_key +
    "&limit=" +
    number +
    "&period=1month&format=json";
  var element = document.getElementById(elementID);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", lastFMurl, true); // begins request to Last.FM

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      // When Last.FM is ready,
      if (xmlhttp.status == 200) {
        // And we have text,
        var obj = JSON.parse(xmlhttp.responseText);
        // console.log(obj);

        if (method == "user.getrecenttracks") {
          var total = obj.recenttracks["@attr"].total;
          element.innerHTML = ""; // Clear previous content before adding new track

          for (i = 0; i < number; i++) {
            // Loop through responses
            var track = obj.recenttracks.track[i]; // references this specific track
            // console.log(track);
            // fetches data from track
            var artistName = track.artist["#text"];
            var albumName = track.album["#text"];
            var songName = track.name;
            var songURL = track.url;

            // prints link to song with artist and song name
            if (number == 1) {
              if (track["@attr"] && track["@attr"].nowplaying !== ""){
                element.innerHTML +=
                  '<i class="fas fa-volume-up fa-fw" title="Im listening to this now, not you :P"></i><a href="https://www.last.fm/user/fibrili/library" target="_blank" rel="noreferrer noopener"> &nbsp;&nbsp; now listening: </a> ';
              } else {
                element.innerHTML +=
                  '<i class="fas fa-volume-off fa-fw"></i><a href="https://www.last.fm/user/fibrili/library" target="_blank" rel="noreferrer noopener"> &nbsp;&nbsp; last played: </a> ';
              }
            } else {
              element.innerHTML += "<li>";
            }

            element.innerHTML +=
              '&nbsp<a href="' +
              songURL +
              '" target="_blank" rel="noreferrer noopener">' +
              artistName.replace(/'/g, '"') +
              " - " +
              songName.replace(/'/g, '"') +
              "</a> ";

            if (track["@attr"] && track["@attr"].nowplaying !== "") {
              element.innerHTML +=
                '&nbsp&nbsp&nbsp<img src="/assets/general/scrobbling.gif" alt="Now Playing" title="Now Playing" />';

              element.innerHTML += "</li>";
            }
          }
        } else if (method == "user.gettopalbums") {
          for (i = 0; i < number; i++) {
            var album = obj.topalbums.album[i]; // references this specific artist
            const imageUrl = album.image?.[1]?.["#text"]; 
            // console.log(artist);
            if (imageUrl && imageUrl.trim() !== "") {
              element.innerHTML +=
                "<a href='" +
                album.url +
                "' target='_blank' rel='noreferrer noopener' style='height: 64px;' loading='lazy' decoding='async'><img src='" +
                imageUrl +
                "' title='" +
                album.artist.name.replace(/'/g, '"') + // single quotes mean something here, so single quotes in string are replaced by double quotes
                " - " +
                album.name.replace(/'/g, '"') +
                " - " +
                album.playcount +
                " plays' alt='" +
                album.artist.name.replace(/'/g, '"') +
                " - " +
                album.name +
                "';/>";
            }
          }
        } else if (method == "user.gettopartists") {
          for (i = 0; i < number; i++) {
            var artist = obj.topartists.artist[i]; // references this specific artist
            // console.log(artist);
            element.innerHTML +=
              "<a href='" +
              artist.url +
              "' target='_blank' rel='noreferrer noopener'><img src='" +
              artist.image[1]["#text"] +
              "' title='" +
              artist.name.replace(/'/g, '"') +
              " - " +
              artist.playcount +
              " plays' alt='" +
              artist.name.replace(/'/g, '"') +
              " - " +
              artist.playcount +
              " plays';/>";
          }
        }
      }
    }
  };
  xmlhttp.send(null); // Close connection
}

lastFM_request("user.getrecenttracks","fibrili","c0674923fe24ec9a2ec6b60ef3d73ff3","1", "lasttrack");
lastFM_request("user.gettopalbums","fibrili","c0674923fe24ec9a2ec6b60ef3d73ff3","10","topalbums");

function updateRecentTrack() {
  lastFM_request("user.getrecenttracks", "fibrili", "c0674923fe24ec9a2ec6b60ef3d73ff3", "1", "lasttrack");
}
setInterval(updateRecentTrack, 30000);
// Update every 30 seconds