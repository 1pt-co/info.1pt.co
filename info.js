SITE_URL = "info.1pt.co/";

window.onload = function () {
  var url = window.location.href.split(SITE_URL)[1].toLowerCase();
  console.log(window.location.href);
  url = url.split("?")[0]; // Remove URL parameters
  url = url.replace("/", ""); // Remove trailing slashes

  document.querySelector("#short").innerHTML = "1pt.co/" + url;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 301) {
      data = JSON.parse(this.responseText);
      displayInfo(data);
      finishLoading();
    } else if (this.readyState == 4 && this.status == 404) {
      document.querySelector("#long").style.display = "none";
      document.querySelector("#description").innerHTML =
        "does not redirect anywhere!";
      finishLoading();
    }
  };

  xhttp.open("GET", "https://api.1pt.co/getInfo?url=" + url, true);
  xhttp.send();
};

function displayInfo(info) {
  const date = Date.parse(info.date);
  const now = Date.now();
  const deltaDays = Math.round((now - date) / (1000 * 60 * 60 * 24));

  var number = 0;
  var description = "";

  if (deltaDays == 0) {
    number = "";
    description = "Today";
  } else if (deltaDays == 1) {
    number = "";
    description = "Yesterday";
  } else if (deltaDays < 30) {
    number = deltaDays;
    description = " days ago";
  } else if (deltaDays < 365) {
    number = Math.ceil(deltaDays / 30);
    description = " months ago";
  } else {
    number = Math.ceil(deltaDays / 365);
    description = " years ago";
  }

  document.querySelector("#long").innerHTML = data.long;
  document.querySelector("#long").href = data.long;
  document.querySelector("#long").style.textShadow = "none";
  document.querySelector("#long").style.color = "white";

  const divs = document.getElementsByClassName("info");

  Array.from(divs).forEach((div) => {
    div.style.display = "flex";
  });

  document.querySelector("#clicks").innerHTML = data.hits;
  document.querySelector("#date").innerHTML = number;
  document.querySelector("#date-description").innerHTML = description;
}

function finishLoading() {
  document.querySelector("#loaded").style.display = "flex";
  document.querySelector("#loading").style.display = "none";
}
