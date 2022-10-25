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


let burgHamburgerSize = 'M';
let burgBigMacSize = 'M';
let burgMcDoubleSize = 'M';
let burgCheeseburgerSize = 'M';

let bevCocaColaSize = 'M';
let bevSpriteSize = 'M';
let bevDrPepperSize = 'M';
let bevFantaSize = 'M';

let sidebarStatus = 'closed';
let staffMessageCount = 0;

const checkoutStrings = ['Hamburger: ', 'BigMac: ', 'McDouble: ', 'Cheeseburger: ',
  'CocaCola: ', 'Sprite: ', 'DrPepper: ', 'Fanta: '
];

const checkoutInfoDiv = document.createElement("div");
checkoutInfoDiv.setAttribute("id", "checkoutInfoDiv");
const checkoutTotalPriceDiv = document.createElement("div");
checkoutTotalPriceDiv.setAttribute("id", "checkoutTotalPriceDiv");

const checkoutInfoDivItem = document.createElement("div");
checkoutInfoDivItem.setAttribute("id", "checkoutInfoDivItem");
const checkoutInfoDivSize = document.createElement("div");
checkoutInfoDivSize.setAttribute("id", "checkoutInfoDivSize");
const checkoutInfoDivNum = document.createElement("div");
checkoutInfoDivNum.setAttribute("id", "checkoutInfoDivNum");
const checkoutInfoDivPrice = document.createElement("div");
checkoutInfoDivPrice.setAttribute("id", "checkoutInfoDivPrice");

let checkoutArray = ["", "", "", ""];

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


function submitToCheckout() {
  infoWrapper.innerHTML = "<h1>Order:</h1>"
  let itemCountArray = [
    burgHamburgerCount, burgBigMacCount, burgMcDoubleCount, burgCheeseburgerCount,
    bevCocaColaCount, bevSpriteCount, bevDrPepperCount, bevFantaCount
  ];
  let x = 0;
  for (var i = 0; i < itemCountArray.length; i++)
    if (itemCountArray[i] > 0) x = 1;
  if (x == 1) {
    infoCover.classList.toggle("infoPopUp");

    infoWrapper.append(checkoutInfoDiv);
    createCheckout();
    checkoutInfoDiv.append(checkoutInfoDivItem);
    checkoutInfoDiv.append(checkoutInfoDivSize);
    checkoutInfoDiv.append(checkoutInfoDivNum);
    checkoutInfoDiv.append(checkoutInfoDivPrice);
    infoWrapper.append(checkoutTotalPriceDiv);
    infoWrapper.append(checkoutElseContainer);
  } else {
    Swal.fire({
      title: "You haven't ordered anything",
      icon: 'warning',
      background: 'rgba(254, 198, 48, 1)',
      iconColor: 'rgba(212, 43, 30, 1)',
      confirmButtonColor: 'rgba(212, 43, 30, 1)'
    });
  }
}
wrapper.addEventListener("submit", (e) => {
  e.preventDefault();
  submitToCheckout();
});




function createCheckout() {
  checkoutArray[0] = "<h2>Item:</h2>";
  checkoutArray[1] = "<h2>Size:</h2>";
  checkoutArray[2] = "<h2>Count:</h2>";
  checkoutArray[3] = '<h2 title="VAT included">Price:</h2>';
  let totalPrice = 0;
  let itemCountArray = [
    burgHamburgerCount, burgBigMacCount, burgMcDoubleCount, burgCheeseburgerCount,
    bevCocaColaCount, bevSpriteCount, bevDrPepperCount, bevFantaCount
  ];
  let itemSizeArray = [burgHamburgerSize, burgBigMacSize, burgMcDoubleSize, burgCheeseburgerSize,
    bevCocaColaSize, bevSpriteSize, bevDrPepperSize, bevFantaSize
  ];
  let size;
  for (var i = 0; i < itemCountArray.length; i++) {
    if (itemCountArray[i] > 0) {
      switch (itemSizeArray[i]) {
        case 'S':
          size = 0.9;
          break;
        case 'M':
          size = 1;
          break;
        case 'L':
          size = 1.2;
          break;
      }
      let price = itemCountArray[i] * itemPriceArray[i] * size;
      price = Math.round(price * 100) / 100;
      totalPrice += price;
      totalPrice = Math.round(totalPrice * 100) / 100;
      checkoutArray[0] += checkoutStrings[i] + " <br> ";
      checkoutArray[1] += itemSizeArray[i] + " <br> ";
      checkoutArray[2] += itemCountArray[i] + " <br> ";
      checkoutArray[3] += price + ' EUR' + " <br> ";
    }
  }
  checkoutTotalPriceDiv.innerHTML = "Total price = " + totalPrice + ' EUR';
  checkoutInfoDivItem.innerHTML = checkoutArray[0];
  checkoutInfoDivSize.innerHTML = checkoutArray[1];
  checkoutInfoDivNum.innerHTML = checkoutArray[2];
  checkoutInfoDivPrice.innerHTML = checkoutArray[3];
}

function count(count, x, string) { // x=1/0  1 --> odstevanje   0 --> sestevanje
  if (x == 0 && count < 30)
    count++;
  else if ((count == 1 && x == 1) || (x == 0 && count > 29));
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
      return 'S';
    case "middle":
      element.classList.remove("moveRadioLeft");
      element.classList.remove("moveRadioRight");
      element.classList.toggle("moveRadioMiddle");
      return 'M';
    case "right":
      element.classList.remove("moveRadioLeft");
      element.classList.remove("moveRadioMiddle");
      element.classList.toggle("moveRadioRight");
      return 'L';
  }
}

$('#copyrightMap').on('click', function(e) {
  Swal.fire({
    title: "Credits:",
    icon: 'info',
    html: '<div style="text-align:left;line-height:25px;">Mai Rupnik, 4. Ra<br>Form project, made with HTML and CSS (+JavaScript)<br>Professor: Boštjan Vouk</div>',
    background: 'rgba(254, 198, 48, 1)',
    iconColor: 'rgb(52, 52, 52)',
    confirmButtonColor: 'rgba(212, 43, 30, 1)'
  });
});
$('#expandSidebarButton').on('click', function(e) {
  if (sidebarStatus == 'closed') {
    sidebarStatus = 'open';
    document.getElementById('expandImg').classList.toggle('rotateExpandImg');
    const sidebarContainer = document.getElementById('sidebarContainer')
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerWidth');
    }, 0);
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerTranslate');
    }, 300);
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerHeight');
    }, 300);

  } else {
    sidebarStatus = 'closed';
    document.getElementById('expandImg').classList.toggle('rotateExpandImg');
    const sidebarContainer = document.getElementById('sidebarContainer')
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerWidth');
    }, 650);
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerTranslate');
    }, 300);
    setTimeout(() => {
      sidebarContainer.classList.toggle('expandSidebarContainerHeight');
    }, 0);

  }


});

function socialMediaSwal(s) {
  switch (s) {
    case 'github':
      Swal.fire({
        title: "Find my work on Github:",
        html: '<a href="https://github.com/mairup/" target="blank">https://github.com/mairup/</a>',
        imageUrl: 'pics/githubIcon.svg',
        imageWidth: 200,
        background: 'rgba(254, 198, 48, 1)',
        iconColor: 'rgb(52, 52, 52)',
        confirmButtonColor: 'rgba(212, 43, 30, 1)'
      });
      break;
    case 'telegram':
      Swal.fire({
        title: "Text me on Telegram:",
        text: '+386 12 123 123',
        imageUrl: 'pics/telegramIcon.svg',
        imageWidth: 200,
        background: 'rgba(254, 198, 48, 1)',
        iconColor: 'rgb(52, 52, 52)',
        confirmButtonColor: 'rgba(212, 43, 30, 1)'
      });
      break;
    case 'insta':
      Swal.fire({
        title: "Find me on Instagram:",
        html: '<a href="https://www.instagram.com/mai_rupnik/" target="blank">@mai_rupnik</a>',
        imageUrl: 'pics/instagramIcon.svg',
        imageWidth: 200,
        background: 'rgba(254, 198, 48, 1)',
        iconColor: 'rgb(52, 52, 52)',
        confirmButtonColor: 'rgba(212, 43, 30, 1)'
      });
      break;
    case 'gmail':
      Swal.fire({
        title: "Business e-mail:",
        text: 'maimairupnik@gmail.com',
        imageUrl: 'pics/gmailIcon.svg',
        imageWidth: 200,
        background: 'rgba(254, 198, 48, 1)',
        iconColor: 'rgb(52, 52, 52)',
        confirmButtonColor: 'rgba(212, 43, 30, 1)'
      });
      break;

  }
}

function creditCardSpaces(id) {
  let x = document.getElementById(id).value.length;
  console.log(x);
  if ((x) % 5 == 0 && x < 17 && x != 0) {
    document.getElementById(id).value = document.getElementById(id).value.substr(0, x - 1) + ' ' + document.getElementById(id).value.charAt(x - 1);
  }
  if (document.getElementById(id).value.charAt(x) == ' ') {
    document.getElementById(id).value = document.getElementById(id).value.substr(0, x - 1);
  }
}

infoWrapper.addEventListener("submit", (e) => {
  e.preventDefault();
  let s = document.getElementById('inputFullName').value;
  Swal.fire({
    background: 'rgba(254, 198, 48, 1)',
    iconColor: 'rgb(67, 189, 64)',
    confirmButtonColor: 'rgba(212, 43, 30, 1)',
    icon: 'success',
    title: 'Thank you for your purchase ' + s,
    timer: 5000
  }).then((result) => {
    window.location.reload(true);
  });
});

function paymentTypeHandler(pos) {
  const paymentInputElementsArray = document.getElementsByClassName('creditCardInput');
  if (pos == 'right') {
    for (let i = 0; i < paymentInputElementsArray.length; i++) {
      paymentInputElementsArray[i].required = false;
    };
    document.getElementById('paymentTypeSelectHover').classList.add('paymentTypeSelectTopMove');
    document.getElementById('paymentCreditCardContainer').classList.add('paymentCreditCardContainerShrunk');
  } else {
    for (let i = 0; i < paymentInputElementsArray.length; i++) {
      paymentInputElementsArray[i].required = true;
    };
    document.getElementById('paymentTypeSelectHover').classList.remove('paymentTypeSelectTopMove');
    document.getElementById('paymentCreditCardContainer').classList.remove('paymentCreditCardContainerShrunk');
  }
}

const messageContainer = document.getElementById('messageContainer');
const chatbotInput = document.getElementById('chatBotInput');

function sendMessageUser() {
  if (chatBotInput.value != "") {
    let userMessage = document.createElement('div');
    let userMessageData = document.createElement('div');
    userMessage.className = 'userMessageBox';
    userMessageData.className = 'userMessageData';
    userMessageData.innerText = chatBotInput.value;
    messageContainer.appendChild(userMessage);
    userMessage.appendChild(userMessageData);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    setTimeout(() => {
      sendMessageStaff();
    }, 700);
  }

}

function sendMessageStaff() {
  if (staffMessageCount < 1) {
    let staffMessage = document.createElement('div');
    let staffMessageData = document.createElement('div');
    staffMessage.className = 'staffMessageBox';
    staffMessageData.className = 'staffMessageData';
    staffMessageData.innerText = 'Sorry for the inconvenience, but no staff is curently online.' +
      '\n\bIf you have any questions, contact us through our social media below.'
    messageContainer.appendChild(staffMessage);
    staffMessage.appendChild(staffMessageData);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    staffMessageCount++;
  }
}

$('#chatBotInput').keypress(function(event) {
  if (event.keyCode === 13) {
    sendMessageUser();
    chatBotInput.value = "";
  }
})