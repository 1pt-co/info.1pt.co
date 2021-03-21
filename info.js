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
      document.querySelector("#long").innerHTML = data.long;
      document.querySelector("#long").href = data.long;
      document.querySelector("#long").style.textShadow = "none";
      document.querySelector("#long").style.color = "white";
    } else if (this.readyState == 4 && this.status == 404) {
      document.querySelector("#error404").style.visibility = "visible";
      document.querySelector("#loading").style.display = "none";
    }
  };

  xhttp.open("GET", "https://api.1pt.co/getInfo?url=" + url, true);
  xhttp.send();
};
