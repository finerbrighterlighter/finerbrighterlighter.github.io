var numPostsToShow = 2;
var isExpanded = false;

function togglePosts(div_id, btn_id) {
  var posts = document.querySelectorAll(div_id);
  var toggleBtn = document.getElementById(btn_id);
  for (var i = 0; i < posts.length; i++) {
    if (isExpanded) {
      if (i < numPostsToShow) {
        posts[i].classList.remove("hidden");
      } else {
        posts[i].classList.add("hidden");
      }
      toggleBtn.innerHTML = "<b>[Expand +]</b>";
    } else {
      posts[i].classList.remove("hidden");
      toggleBtn.innerHTML= "<b>[Collapse -]</b>";
    }
  }
  isExpanded = !isExpanded;
}

var style = document.createElement("style");
style.innerHTML = ".hidden { display: none; }";
document.head.appendChild(style);
