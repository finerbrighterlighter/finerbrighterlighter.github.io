const clientId = '7042caff01554d9dd3fbd0de97a345f4285b64a77536e979ea219cd1ee347d19'; // Replace this with your actual Client ID
const apiUrl = `https://api.trakt.tv/users/{username}/watched/{type}`;
const tmdbApiKey = 'a92e5943352e9146b887de7d871ee4aa'; // Replace this with your actual TMDb API key


async function fetchData(username, type) {
    const url = `${apiUrl.replace('{username}', username).replace('{type}', type)}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': clientId
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function loadWatchedData(username, number, elementId) {
    try {
        const showsPromise = fetchData(username, 'shows');
        const moviesPromise = fetchData(username, 'movies');
        const [shows, movies] = await Promise.all([showsPromise, moviesPromise]);

        const watchedItems = [...shows, ...movies].sort((a, b) => {
            const dateA = new Date(a.last_watched_at);
            const dateB = new Date(b.last_watched_at);
            return dateB - dateA; // Sort by date descending
        });

        displayitem(watchedItems, number, elementId);
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

async function fetchImage(tmdbId, type) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${tmdbApiKey}&append_to_response=images`);
        const data = await response.json();
        return data.images.backdrops.length > 0 ? `https://image.tmdb.org/t/p/w500${data.images.backdrops[0].file_path}` : null;
    } catch (error) {
        console.error('Failed to fetch image:', error);
        return null;
    }
}

async function displayitem(watchedItems, number, elementID) {
    const element = document.getElementById(elementID);
		
    for (i = 0; i < number; i++) {
    		
    		const item = watchedItems[i];
       /*  console.log(item); */
				            
        if (item.show){
        		console.log(item.show);
            const title = item.show.title;
            const year = item.show.year;
            const url = `https://trakt.tv/shows/${item.show.ids.slug}`;
            const image = await fetchImage(item.show.ids.tmdb, "tv");

         		element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            " (" +
            year +
            ")';/>";
         
        } else if (item.movie) {
        		console.log(item.movie);
            const title = item.movie.title;
            const year = item.movie.year;
            const url = `https://trakt.tv/shows/${item.movie.ids.slug}`;
            const image = await fetchImage(item.movie.ids.tmdb, "movie");
            
            element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            " (" +
            year +
            ")';/>";
        }
        
      }}


async function displayShows(shows, number, elementID) {
    const element = document.getElementById(elementID);
		
    for (i = 0; i < number; i++) {
    		const show = shows[i];
        
        
				if (show && show.show && show.show.title && show.show.ids.tmdb) {
        		const title = show.show.title;
            const url = `https://trakt.tv/shows/${show.show.ids.slug}`;
            const image = await fetchShowImage(show.show.ids.tmdb);
            element.innerHTML +=
            "<a href='" +
            url +
            "' target='_blank' rel='noreferrer noopener' style='height: 64px;'  loading='lazy' decoding='async'><img src='" +
            image +
            "' title='" +
            title.replace(/'/g, "") +
            "';/>";
        }
        
    }
}

loadWatchedData('hteza', 10, 'last-watched');
/*
document.addEventListener('DOMContentLoaded', function() {
    loadWatchedData('hteza', 10, 'last-watched');
});// This will handle any errors in the async flow */
