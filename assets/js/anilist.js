function getLastReadManga(number) {
    axios.post('https://graphql.anilist.co', {
      query: `
        query {
          MediaListCollection(userName: "finer", type: MANGA, sort: [UPDATED_TIME_DESC]) {
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
      
      const element = document.getElementById('last-read-manga');
      for (i = 0; i < number; i++) {
      	const manga = response.data.data.MediaListCollection.lists[0].entries[i].media;
      	const title = manga.title.userPreferred;
        const url = manga.siteUrl;
        const image= manga.coverImage.medium;
        element.innerHTML += "<a href='" + url + "' target='_blank' rel='noreferrer noopener'><img src='" + image + "' title='" + title + "' alt='" + title + "'style='filter: grayscale(50%)';/>";
      }
      
    })
    .catch(error => {
      console.error(error);
    });
  }

  getLastReadManga(20);