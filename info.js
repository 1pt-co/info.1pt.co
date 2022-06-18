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
      document.querySelector(".info-wrapper").style.display = "none";
    }
  };

  xhttp.open("GET", "https://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/get-info.php?url=" + url, true);
  xhttp.send();
};

function displayInfo(info) {
  const date = Date.parse(info.date);
  const now = Date.now();
  const deltaDays = Math.round((now - date) / (1000 * 60 * 60 * 24));

  if (info.long.includes("https://") || info.long.includes("http://")) {
    var long = info.long;
  } else {
    var long = "http://" + info.long;
  }

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

  document.querySelector("#long").innerHTML = long;
  document.querySelector("#long").href = "https://1pt.co/" + info.short;

  document.querySelector("#clicks").innerHTML = info.hits;
  document.querySelector("#date").innerHTML = number;
  document.querySelector("#date-description").innerHTML = description;

  if (!info.malicious) {
    document.querySelector("#verified").style.display = "block";
    document.querySelector("#preview").src =
      "https://api.1pt.co/proxy?url=" + long;
    document.querySelector("#preview-wrapper").href =
      "https://1pt.co/" + info.short;
  } else {
    document.querySelector("#malicious").style.display = "block";
    document.querySelector("#long").removeAttribute("href");
    document.querySelector("#long").classList.remove("link");
    document.querySelector("#preview-wrapper").style.display = "none";
  }
}

function finishLoading() {
  document.querySelector("#loaded").style.display = "flex";
  document.querySelector("#loading").style.display = "none";
}
