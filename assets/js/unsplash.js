function random_unsplash(username, size, number, elementID){
	var element = document.getElementById("img-container");
	for (i = 0; i < number; i++) {
		element.innerHTML += '<img src="https://source.unsplash.com/user/'+username+'/'+size+'x'+size+'?sig='+i+'">'
	}
}

setInterval(random_unsplash('finerbrighterlighter', '64', '10', 'img-container'), 5000);