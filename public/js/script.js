let itemObject;
const itemsContainer = document.getElementById("itemsContainer");

function ajaxLoadJSON() {
  $.ajax({
    url: "/ajax",
    method: "POST",
    contentType: "application/JSON",
    success: function (res) {
      itemObject = res.response;
      createItemsHTML();
    }
  })
}

ajaxLoadJSON();

function createChild(itemTypeContainerBox, i) {

  let currentTitleSpan = document.createElement("span");
  let currentSizeSpan = document.createElement("span");
  let currentCountSelectSpan = document.createElement("span");
  let currentLeftArrowImg = document.createElement("img");
  let currentRightArrowImg = document.createElement("img");
  let currentCountNumberSpan = document.createElement("span");
  let currentBotSizeSelectSpan = document.createElement("span");
  let currentRadioSizeSmallSpan = document.createElement("span");
  let currentRadioSizeMediumSpan = document.createElement("span");
  let currentRadioSizeLargeSpan = document.createElement("span");
  let currentRadioMark = document.createElement("div");
  let currentInfoIconSpan = document.createElement("span");
  let currentinfoIconImg = document.createElement("img");

  let currentDiv = document.createElement("div");
  currentDiv.setAttribute("class", "checkboxContainer");


  currentTitleSpan.setAttribute("id", itemObject[i]['type'] + itemObject[i]['title'] + "Title");
  currentTitleSpan.setAttribute("class", "checkboxImage");
  currentTitleSpan.innerHTML = itemObject[i]["title"];
  let s = "itemObject[" + i + "]['count']=resetCount('" + itemObject[i]['type'] + itemObject[i]['title'] + 'Count' + "');dropSizeSelect('" + itemObject[i]['type'] + itemObject[i]['title'] + "Size','" + itemObject[i]['type'] + itemObject[i]['title'] + "Title');";
  currentTitleSpan.setAttribute("onclick", s);

  currentLeftArrowImg.setAttribute("class", "countArrow");
  currentLeftArrowImg.setAttribute("src", "pics/leftArrow.svg");
  currentLeftArrowImg.setAttribute("alt", "image");
  currentLeftArrowImg.setAttribute("onclick", "itemObject[" + i + "]['count']=count(itemObject[" + i + "]['count'],1,'" + itemObject[i]['type'] + itemObject[i]['title'] + 'Count' + "')");

  currentRightArrowImg.setAttribute("class", "countArrow");
  currentRightArrowImg.setAttribute("src", "pics/rightArrow.svg");
  currentRightArrowImg.setAttribute("alt", "image");
  currentRightArrowImg.setAttribute("onclick", "itemObject[" + i + "]['count']=count(itemObject[" + i + "]['count'],0,'" + itemObject[i]['type'] + itemObject[i]['title'] + 'Count' + "')");

  currentCountNumberSpan.setAttribute("class", "countNumber");
  currentCountNumberSpan.setAttribute("id", itemObject[i]['type'] + itemObject[i]['title'] + 'Count');

  currentRadioSizeSmallSpan.setAttribute("class", "radioSize");
  currentRadioSizeSmallSpan.setAttribute("onclick", "itemObject[" + i + "]['size']=moveRadio('left','" + itemObject[i]['type'] + itemObject[i]['title'] + 'RadioMark' + "')");
  currentRadioSizeSmallSpan.innerHTML = 'S';
  currentRadioSizeMediumSpan.setAttribute("class", "radioSize");
  currentRadioSizeMediumSpan.setAttribute("onclick", "itemObject[" + i + "]['size']=moveRadio('middle','" + itemObject[i]['type'] + itemObject[i]['title'] + 'RadioMark' + "')");
  currentRadioSizeMediumSpan.innerHTML = 'M';
  currentRadioSizeLargeSpan.setAttribute("class", "radioSize");
  currentRadioSizeLargeSpan.setAttribute("onclick", "itemObject[" + i + "]['size']=moveRadio('right','" + itemObject[i]['type'] + itemObject[i]['title'] + 'RadioMark' + "')");
  currentRadioSizeLargeSpan.innerHTML = 'L';

  currentSizeSpan.setAttribute("id", itemObject[i]['type'] + itemObject[i]['title'] + 'Size');
  currentSizeSpan.setAttribute("class", "sizeSelect");

  currentCountSelectSpan.setAttribute("class", "countSelect");
  currentBotSizeSelectSpan.setAttribute("class", "botSizeSelect");

  currentRadioMark.setAttribute("class", "radioMark");
  currentRadioMark.setAttribute("id", itemObject[i]['type'] + itemObject[i]['title'] + 'RadioMark');

  currentInfoIconSpan.setAttribute("class", "infoIcon");
  currentInfoIconSpan.setAttribute("onclick", "toggleInfo(" + i + ")");

  currentinfoIconImg.setAttribute("src", "pics/infoIcon.svg");

  currentSizeSpan.append(currentCountSelectSpan);
  currentSizeSpan.append(currentBotSizeSelectSpan);

  currentCountSelectSpan.append(currentLeftArrowImg);
  currentCountSelectSpan.append(currentCountNumberSpan);
  currentCountSelectSpan.append(currentRightArrowImg);

  currentBotSizeSelectSpan.append(currentRadioSizeSmallSpan);
  currentBotSizeSelectSpan.append(currentRadioSizeMediumSpan);
  currentBotSizeSelectSpan.append(currentRadioSizeLargeSpan);

  currentDiv.append(currentTitleSpan);
  currentDiv.append(currentSizeSpan);
  currentDiv.append(currentRadioMark);
  currentDiv.append(currentInfoIconSpan);
  currentInfoIconSpan.append(currentinfoIconImg);

  itemTypeContainerBox.append(currentDiv);
}

function createItemsHTML() {

  let itemTypeContainer = document.createElement("div");
  let itemTypeContainerName = "";
  let itemTypeContainerH1 = document.createElement("h1");
  let itemTypeContainerBox = document.createElement("div");
  itemTypeContainerBox.setAttribute("class", "itemLine");

  for (let i = 0; i < itemObject.length; i++) {
    if (itemObject[i]['type'] != itemTypeContainerName) {
      itemTypeContainerH1 = document.createElement("h1");
      itemTypeContainerH1.innerText = itemObject[i]["type"];
      itemsContainer.append(itemTypeContainerH1);
      itemTypeContainer = document.createElement("div");
      itemTypeContainer.setAttribute("id", itemObject[i]["type"] + "Container");
      itemsContainer.append(itemTypeContainer);
      itemTypeContainerBox = document.createElement("div");
      itemTypeContainerBox.setAttribute("class", "itemLine");
    }
    if (itemTypeContainerBox.childElementCount < 2) {
      createChild(itemTypeContainerBox, i);
    } else {
      itemTypeContainerBox = document.createElement("div");
      itemTypeContainerBox.setAttribute("class", "itemLine");
      createChild(itemTypeContainerBox, i);
    }
    itemTypeContainer.append(itemTypeContainerBox);
    itemTypeContainerName = itemObject[i]["type"];
  }


}


let sidebarStatus = 'closed';
let staffMessageCount = 0;

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

function toggleInfo(i) {
  infoCover.classList.toggle("infoPopUp");
  infoHeader = document.createElement("h1");
  infoHeader.innerText = itemObject[i]['title'] + " nutrition"
  infoWrapper.append(infoHeader);
  bigNutrition = document.createElement("div");
  bigNutrition.setAttribute("class", "bigNutrition");
  infoWrapper.append(bigNutrition);

  bigNutritionValue = document.createElement("div");
  bigNutritionValue.setAttribute("class", "bigNutritionValue");
  bigNutritionValueH1 = document.createElement("h1");
  bigNutritionValueH1.innerText = itemObject[i]['calories'] + "Cal.";
  bigNutritionValue.append(bigNutritionValueH1);
  bigNutritionValue.append("Calories");
  bigNutrition.append(bigNutritionValue);

  bigNutritionValue = document.createElement("div");
  bigNutritionValue.setAttribute("class", "bigNutritionValue");
  bigNutritionValueH1 = document.createElement("h1");
  bigNutritionValueH1.innerText = itemObject[i]['fats'] + "g";
  bigNutritionValue.append(bigNutritionValueH1);
  bigNutritionValue.append("Total Fat");
  bigNutrition.append(bigNutritionValue);

  bigNutritionValue = document.createElement("div");
  bigNutritionValue.setAttribute("class", "bigNutritionValue");
  bigNutritionValueH1 = document.createElement("h1");
  bigNutritionValueH1.innerText = itemObject[i]['carbs'] + "g";
  bigNutritionValue.append(bigNutritionValueH1);
  bigNutritionValue.append("Total Carbs");
  bigNutrition.append(bigNutritionValue);

  bigNutritionValue = document.createElement("div");
  bigNutritionValue.setAttribute("class", "bigNutritionValue");
  bigNutritionValueH1 = document.createElement("h1");
  bigNutritionValueH1.innerText = itemObject[i]['protein'] + "g";
  bigNutritionValue.append(bigNutritionValueH1);
  bigNutritionValue.append("Protein");
  bigNutrition.append(bigNutritionValue);

  smallNutrition = document.createElement("div");
  smallNutrition.setAttribute("class", "smallNutrition");
  infoWrapper.append(smallNutrition);

  smallNutritionCollumn = document.createElement("div");
  smallNutritionCollumn.setAttribute("class", "smallNutritionCollumn");
  smallNutrition.append(smallNutritionCollumn);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Saturated Fat:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['saturated-fat'] + "g";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Dietary Fiber:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['dietary-fiber'] + "g";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Calcium:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['calcium'] + "mg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Total Fat:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['total-fat'] + "g";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionCollumn = document.createElement("div");
  smallNutritionCollumn.setAttribute("class", "smallNutritionCollumn");
  smallNutrition.append(smallNutritionCollumn);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Total Sugars:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['total-sugars'] + "g";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Iron:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['iron'] + "mg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Cholesterol:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['cholesterol'] + "mg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Vitamin D:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['vitamin-d'] + "mcg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionCollumn = document.createElement("div");
  smallNutritionCollumn.setAttribute("class", "smallNutritionCollumn");
  smallNutrition.append(smallNutritionCollumn);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Potassium:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['potassium'] + "mg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

  smallNutritionValue = document.createElement("div");
  smallNutritionValue.setAttribute("class", "smallNutritionValue");

  smallNutritionValueLeft = document.createElement("div");
  smallNutritionValueLeft.setAttribute("class", "smallNutritionValueLeft");
  smallNutritionValueLeft.innerText = "Sodium:";
  smallNutritionValueRight = document.createElement("div");
  smallNutritionValueRight.setAttribute("class", "smallNutritionValueRight");
  smallNutritionValueRight.innerText = itemObject[i]['sodium'] + "mg";

  smallNutritionCollumn.append(smallNutritionValue);
  smallNutritionValue.append(smallNutritionValueLeft);
  smallNutritionValue.append(smallNutritionValueRight);

}

$('#infoCover').on('click', function (e) {
  if (e.target !== this)
    return;
  infoWrapper.innerHTML = "";
  infoCover.classList.toggle("infoPopUp");
});


function submitToCheckout() {
  infoWrapper.innerHTML = "<h1>Order:</h1>";
  let x = 0;
  for (var i = 0; i < itemObject.length; i++)
    if (itemObject[i]['count'] > 0) x = 1;
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
  let size;
  for (var i = 0; i < itemObject.length; i++) {
    if (itemObject[i]['count'] > 0) {
      switch (itemObject[i]['size']) {
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
      let price = itemObject[i]['count'] * itemObject[i]['price'] * size;
      price = Math.round(price * 100) / 100;
      totalPrice += price;
      totalPrice = Math.round(totalPrice * 100) / 100;
      checkoutArray[0] += itemObject[i]['title'] + ": <br> ";
      checkoutArray[1] += itemObject[i]['size'] + " <br> ";
      checkoutArray[2] += itemObject[i]['count'] + " <br> ";
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

$('#copyrightMap').on('click', function (e) {
  Swal.fire({
    title: "Credits:",
    icon: 'info',
    html: '<div style="text-align:left;line-height:25px;">Mai Rupnik, 4. Ra<br>Form project, made with HTML and CSS (+JavaScript)<br>Supervisor: Boštjan Vouk</div>',
    background: 'rgba(254, 198, 48, 1)',
    iconColor: 'rgb(52, 52, 52)',
    confirmButtonColor: 'rgba(212, 43, 30, 1)'
  });
});
$('#expandSidebarButton').on('click', function (e) {
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

$('#chatBotInput').keypress(function (event) {
  if (event.keyCode === 13) {
    sendMessageUser();
    chatBotInput.value = "";
  }
})