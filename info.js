SITE_URL = "info.1pt.co/";

window.onload = function () {
  var url = window.location.href.split(SITE_URL)[1].toLowerCase();
  console.log(window.location.href);
  url = url.split("?")[0]; // Remove URL parameters
  url = url.replace("/", ""); // Remove trailing slashes

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 301) {
      data = JSON.parse(this.responseText);
      document.getElementById("short").innerHTML = "1pt.co/" + url;
      document.getElementById("long").innerHTML = data.long;
      document.getElementById("long").href = data.long;
    } else if (this.readyState == 4 && this.status == 404) {
      document.getElementById("error404").style.visibility = "visible";
      document.getElementById("loading").style.display = "none";
    }
  };
  xhttp.open("GET", "https://api.1pt.co/getInfo?url=" + url, true);
  xhttp.send();
};
