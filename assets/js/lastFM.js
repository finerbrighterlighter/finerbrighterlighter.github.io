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
              element.innerHTML +=
                '<i class="fas fa-music fa-fw"></i><a href="https://www.last.fm/user/fibrili/library" target="_blank" rel="noreferrer noopener"> &nbsp;&nbsp; last played: </a> ';
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
            // console.log(artist);
            if (album.image[1]["#text"] != null) {
              element.innerHTML +=
                "<a href='" +
                album.url +
                "' target='_blank' rel='noreferrer noopener' style='height: 64px;' loading='lazy' decoding='async'><img src='" +
                album.image[1]["#text"] +
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

setInterval(
  lastFM_request(
    "user.getrecenttracks",
    "fibrili",
    "c0674923fe24ec9a2ec6b60ef3d73ff3",
    "1",
    "lasttrack"
  ),
  5000
);
setInterval(
  lastFM_request(
    "user.gettopalbums",
    "fibrili",
    "c0674923fe24ec9a2ec6b60ef3d73ff3",
    "10",
    "topalbums"
  ),
  5000
);
