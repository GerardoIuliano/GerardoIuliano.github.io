
function calculateAge() {
  var today = new Date();
  var birthDate = new Date("1999/03/18");
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}
  document.getElementById("age").innerHTML = age;
}

function getHeight() {
  var listCard = document.getElementsByClassName("work-box");
  var max=0;
  for (let listCardKey in listCard) {
    if(listCard[listCardKey].clientHeight>max)
      max = listCard[listCardKey].clientHeight;
  }
  for (let listCardKey in listCard) {
    if(listCard[listCardKey] != undefined)
      listCard[listCardKey].style.height = max
  }
}

function checkDarkMode() {
  console.log("RELOAD")
  var darkMode = sessionStorage.getItem("darkMode");
  if (darkMode == "true") {
    document.getElementsByTagName("body")[0].classList.add("dark-mode");
    document.getElementById("icon-mode").innerHTML="light_mode"
  }
}

function toggleDarkMode() {
  var body = document.getElementsByTagName("body")[0];
  var isDarkMode = body.classList.contains("dark-mode");
  if (isDarkMode) {
    body.classList.remove("dark-mode");
    sessionStorage.setItem("darkMode", "false");
    document.getElementById("icon-mode").innerHTML="dark_mode"
  } else {
    body.classList.add("dark-mode");
    sessionStorage.setItem("darkMode", "true");
    document.getElementById("icon-mode").innerHTML="light_mode"
  }
}

