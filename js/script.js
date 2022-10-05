//import load from "jquery-3.6.1.js";

let burgHamburgerCount = 0;
let burgBigMacCount = 0;
let burgMcDoubleCount = 0;
let burgCheeseburgerCount = 0;

function toggleInfo(s) {
  document.getElementById('infoCover').classList.toggle("infoPopUp");
  $(".infoWrapper").load(s);
}


function count(count, x, string) { // x=1/0  1 --> odstevanje   0 --> sestevanje
  if (x == 1)
    if (count != 0) count--;
    else {}
  else count++;
  document.getElementById(string).innerHTML = count;
  return count;
}

function resetCount(a) {
  document.getElementById(a).innerHTML = 0;
  return 0;
}

function dropSizeSelect(x, y) {
  document.getElementById(x).classList.toggle("clickToggleExpand");
  document.getElementById(y).classList.toggle("clickToggleTitle");
}

function moveRadio(pos, a) {
  switch (pos) {
    case "left":
      document.getElementById(a).classList.remove("moveRadioRight");
      document.getElementById(a).classList.remove("moveRadioMiddle");
      document.getElementById(a).classList.toggle("moveRadioLeft");
      break;
    case "middle":
      document.getElementById(a).classList.remove("moveRadioLeft");
      document.getElementById(a).classList.remove("moveRadioRight");
      document.getElementById(a).classList.toggle("moveRadioMiddle");
      break;
    case "right":
      document.getElementById(a).classList.remove("moveRadioLeft");
      document.getElementById(a).classList.remove("moveRadioMiddle");
      document.getElementById(a).classList.toggle("moveRadioRight");
      break;
    default:

  }
}