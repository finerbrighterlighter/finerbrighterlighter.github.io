  function getLastRead(username, media, number, elementID) {
    axios.post('https://graphql.anilist.co', {
      query: `
        query {
          MediaListCollection(userName: "`+username+`" , type: ` + media +`, sort: [UPDATED_TIME_DESC]) {
            lists {
              entries {
                media {
          				siteUrl
          				coverImage {
            				medium
          				}
          				title {
            				userPreferred
          				}
        				}
              }
            }
          }
        }
      `
    })
    .then(response => {
      
      const element = document.getElementById(elementID);
      for (i = 0; i < number; i++) {
      	const work = response.data.data.MediaListCollection.lists[0].entries[i].media;
      	const title = work.title.userPreferred;
        const url = work.siteUrl;
        const image= work.coverImage.medium;
        element.innerHTML += "<a href='" + url + "' target='_blank' rel='noreferrer noopener'><img src='" + image + "' title='" + title + "' alt='" + title + "'style='filter: grayscale(50%);width:64px;height:128px;object-fit:cover';/>";
      }
      
    })
    .catch(error => {
      console.error(error);
    });
  }

setInterval(getLastRead("finer", "MANGA", 20, "last-read-manga"), 5000);
setInterval(getLastRead("finer", "ANIME", 20, "last-read-anime"), 5000);