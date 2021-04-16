const input = document.querySelector("#input");

// Click 'GO' button if the ENTER key is pressed
input.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    go();
  }
});

function go() {
  let short = "";

  if (input.value.substr(0, 7) == "1pt.co/") short = input.value.substr(7);
  else if (input.value.substr(0, 11) == "www.1pt.co/")
    short = input.value.substr(11);
  else if (input.value.substr(0, 15) == "https://1pt.co/")
    short = input.value.substr(15);
  else if (input.value.substr(0, 14) == "http://1pt.co/")
    short = input.value.substr(14);
  else if (input.value.substr(0, 19) == "https://www.1pt.co/")
    short = input.value.substr(19);
  else if (input.value.substr(0, 18) == "http://www.1pt.co/")
    short = input.value.substr(18);

  if (short !== "") window.location.href = "https://info.1pt.co/" + short;
  else showError("Invalid URL!", "Please enter a 1pt.co URL");
}

const showError = (title, description) => {
  Swal.fire({
    title: title,
    text: description,
    icon: "error",
    confirmButtonText: "OK",
  });
};
