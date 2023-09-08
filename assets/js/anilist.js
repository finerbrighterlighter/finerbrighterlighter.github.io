function getLastRead(username, media, number, elementID) {
  axios
    .post("https://graphql.anilist.co", {
      query:
        `
        query {
          MediaListCollection(userName: "` +
        username +
        `" , type: ` +
        media +
        `, sort: [UPDATED_TIME_DESC]) {
            lists {
              entries {
                media {
          				siteUrl
          				coverImage {
            				medium
          				}
          				title {
            				romaji
							english
          				}
						countryOfOrigin
						synonyms
        				}
              }
            }
          }
        }
      `,
    })
    .then((response) => {
      const element = document.getElementById(elementID);
      for (i = 0; i < number; i++) {
        const work =
          response.data.data.MediaListCollection.lists[0].entries[i].media;
        const title = work.title.romaji;
        const title_en = work.title.english;
        const url = work.siteUrl;
        const lang = work.countryOfOrigin;
        const image = work.coverImage.medium;
        const synonyms = work.synonyms;
        if (title_en != null) {
          element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            " (" +
            title_en.replace(/'/g, "") +
            ", " +
            lang +
            ")' alt='" +
            title.replace(/'/g, "") +
            " (" +
            title_en.replace(/'/g, "") +
            ", " +
            lang +
            ")';/>";
        } else if (synonyms && synonyms.length > 0) {
          element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            " (" +
            synonyms[0].replace(/'/g, "") +
            ", " +
            lang +
            ")' alt='" +
            title.replace(/'/g, "") +
            " (" +
            synonyms[0].replace(/'/g, "") +
            ", " +
            lang +
            ")';/>";
        } else {
          element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            " (" +
            lang +
            ")' alt='" +
            title.replace(/'/g, "") +
            " (" +
            lang +
            ")';/>";
        }
      }
    });
}

// one page only has 19 titles, so the last one will raise error
setInterval(getLastRead("finer", "MANGA", 10, "last-read-manga"), 5000);
