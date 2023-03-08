$(document).ready(function() {
  element = document.getElementById("counter");
  var visitCount = localStorage.getItem("page_view");
// Check if page_view entry is present
  if (visitCount) {
    visitCount = Number(visitCount) + 1;
    localStorage.setItem("page_view", visitCount);
  } else {
    visitCount = 1;
    localStorage.setItem("page_view", 1);
  }
  element.innerHTML = visitCount;
});

function getJSessionId(){
  var jsId = document.cookie.match(/JSESSIONID=[^;]+/);
  console.log(jsId)
  if(jsId != null) {
    if (jsId instanceof Array)
      jsId = jsId[0].substring(11);
    else
      jsId = jsId.substring(11);
  }
  return jsId;
}

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

