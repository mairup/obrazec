//import load from "jquery-3.6.1.js";
let burgHamburgerCount = 0;
let burgBigMacCount = 0;
let burgMcDoubleCount = 0;
let burgCheeseburgerCount = 0;

let bevCocaColaCount = 0;
let bevSpriteCount = 0;
let bevDrPepperCount = 0;
let bevFantaCount = 0;

const burgHamburgerPrice = 5.99;
const burgBigMacPrice = 9.99;
const burgMcDoublePrice = 7.99;
const burgCheeseburgerPrice = 5.99;

const bevCocaColaPrice = 1.99;
const bevSpritePrice = 1.49;
const bevDrPepperPrice = 1.79;
const bevFantaPrice = 1.19;

const itemPriceArray = [burgHamburgerPrice, burgBigMacPrice, burgBigMacPrice, burgCheeseburgerPrice,
  bevCocaColaPrice, bevSpritePrice, bevDrPepperPrice, bevFantaPrice
];


let burgHamburgerSize = 'medium';
let burgBigMacSize = 'medium';
let burgMcDoubleSize = 'medium';
let burgCheeseburgerSize = 'medium';

let bevCocaColaSize = 'medium';
let bevSpriteSize = 'medium';
let bevDrPepperSize = 'medium';
let bevFantaSize = 'medium';

const checkoutStrings = ['Hamburger: ', 'BigMac: ', 'McDouble: ', 'Cheeseburger: ',
  'CocaCola: ', 'Sprite: ', 'DrPepper: ', 'Fanta: '
];

const checkoutInfoDiv = document.createElement("div");
checkoutInfoDiv.setAttribute("id", "checkoutInfoDiv");

const infoCover = document.getElementById('infoCover');
const infoWrapper = document.getElementById('infoWrapper');

const checkoutElseContainer = document.createElement("div");
checkoutElseContainer.setAttribute("id", "checkoutElseContainer");
$(checkoutElseContainer).load("checkout.html");

function toggleInfo(s) {
  infoCover.classList.toggle("infoPopUp");
  $(".infoWrapper").load(s);
}
$('#infoCover').on('click', function(e) {
  if (e.target !== this)
    return;
  $(".infoWrapper").load('infoFiles/blank.html');
  infoCover.classList.toggle("infoPopUp");
});

$('#checkoutLabel').on('click', function(e) {
  let itemCountArray = [
    burgHamburgerCount, burgBigMacCount, burgMcDoubleCount, burgCheeseburgerCount,
    bevCocaColaCount, bevSpriteCount, bevDrPepperCount, bevFantaCount
  ];
  let x = 0;
  for (var i = 0; i < itemCountArray.length; i++)
    if (itemCountArray[i] > 0) x = 1;
  if (x == 1) {
    infoCover.classList.toggle("infoPopUp");
    let s = createCheckout();
    checkoutInfoDiv.innerText = s;
    infoWrapper.append(checkoutInfoDiv);
    infoWrapper.append(checkoutElseContainer);
  } else {
    Swal.fire({
      title: "You haven't ordered anything",
      icon: 'warning'
    });
  }
});

function createCheckout() {
  let totalPrice = 0;
  let itemCountArray = [
    burgHamburgerCount, burgBigMacCount, burgMcDoubleCount, burgCheeseburgerCount,
    bevCocaColaCount, bevSpriteCount, bevDrPepperCount, bevFantaCount
  ];
  let itemSizeArray = [burgHamburgerSize, burgBigMacSize, burgMcDoubleSize, burgCheeseburgerSize,
    bevCocaColaSize, bevSpriteSize, bevDrPepperSize, bevFantaSize
  ];
  let size;
  let checkoutOutput = '';
  for (var i = 0; i < itemCountArray.length; i++) {
    if (itemCountArray[i] > 0) {
      switch (itemSizeArray[i]) {
        case 'small':
          size = 0.9;
          break;
        case 'medium':
          size = 1;
          break;
        case 'large':
          size = 1.2;
          break;
      }
      let price = itemCountArray[i] * itemPriceArray[i] * size;
      price = Math.round(price * 100) / 100;
      totalPrice += price;
      totalPrice = Math.round(totalPrice * 100) / 100;
      checkoutOutput += checkoutStrings[i] + itemSizeArray[i] + " x " + itemCountArray[i] + " = $" + price + " \r\n ";
    }
  }
  checkoutOutput += " \r\n " + "Total price = $" + totalPrice;
  return checkoutOutput;
}

function count(count, x, string) { // x=1/0  1 --> odstevanje   0 --> sestevanje
  if (x == 0)
    count++;
  else if (count == 0);
  else count--;
  document.getElementById(string).innerHTML = count;
  return count;
}

function resetCount(a) {
  console.log(document.getElementById(a).textContent);
  if (document.getElementById(a).textContent > 0) {
    document.getElementById(a).innerHTML = 0;
    return 0;
  }
  document.getElementById(a).innerHTML = 1;
  return 1;
}

function dropSizeSelect(x, y) {
  document.getElementById(x).classList.toggle("clickToggleExpand");
  document.getElementById(y).classList.toggle("clickToggleTitle");
}

function moveRadio(pos, elementId) {
  element = document.getElementById(elementId);
  switch (pos) {
    case "left":
      element.classList.remove("moveRadioRight");
      element.classList.remove("moveRadioMiddle");
      element.classList.toggle("moveRadioLeft");
      return 'small';
    case "middle":
      element.classList.remove("moveRadioLeft");
      element.classList.remove("moveRadioRight");
      element.classList.toggle("moveRadioMiddle");
      return 'medium';
    case "right":
      element.classList.remove("moveRadioLeft");
      element.classList.remove("moveRadioMiddle");
      element.classList.toggle("moveRadioRight");
      return 'large';
  }
}

$('#copyrightMap').on('click', function(e) {
  Swal.fire({
    title: "Credits:",
    icon: 'info',
    text: 'Mai Rupnik'
  });
});

$('#socialMediaIcons').on('click', function(e) {
  Swal.fire({
    title: "Socials:",
    icon: 'info',
    html: '<p class="sweetAlertSocials"><img src="pics/twitterIcon.svg" alt="" class="socialMediaIcons"> @RoomaiGG</p>' +
      '<p class="sweetAlertSocials"><img src="pics/instagramIcon.svg" alt="" class="socialMediaIcons"> Mai Rupnik</p>' +
      '<p class="sweetAlertSocials"><img src="pics/githubIcon.svg" alt="" class="socialMediaIcons"> rupmai</p>'
  });
});