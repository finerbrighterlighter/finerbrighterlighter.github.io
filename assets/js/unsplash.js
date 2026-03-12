function getunsplash(username, accessKey, number, elementID) {
  var element = document.getElementById(elementID);
  fetch(`https://api.unsplash.com/users/${username}/photos?per_page=10`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const time = data.map((photo) => photo.created_at);
      const date = time.map((item) => item.split(/T/)[0]);
      const unsplashUrls = data.map((photo) => photo.links.html);
      const photoUrls = data.map((photo) => photo.urls.thumb);
      for (i = 0; i < number; i++) {if (unsplashUrls[i]) {
        element.innerHTML +=
          "<a href='" +
          unsplashUrls[i] +
          "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
          photoUrls[i] +
          "' title='" +
          date[i] +
          "' alt='" +
          date[i] +
          "';/>";
      }}
    });
}

const unsplash_access_key = "abcdefghijklmnopqrstuvwxyz123456"; // Replace with your actual Unsplash Access Key
getunsplash("finerbrighterlighter",unsplash_access_key,10,"latestimage");
