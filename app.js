'use strict';

var productsArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg',
    'juice-glass.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg',
    'usb.gif', 'water-can.jpg'
];

var objectsArr = []

var totalClicks = 0;

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.clicked = 0;
    this.timeDisplayed = 0;
    objectsArr.push(this);
}

for (var i = 0; i < productsArr.length; i++) {
    new Product(productsArr[i], "img/" + productsArr[i])
}

console.log(objectsArr);
var displayedProductLeft;
var displayedProductCenter;
var displayedProductRight;
var displayLeft = document.getElementById('displayLeft');
var displayCenter = document.getElementById('displayCenter');
var displayRight = document.getElementById('displayRight');

function displayRandomProducts() {

    displayedProductLeft = Math.floor(Math.random() * productsArr.length);

    var productLeftPosition = objectsArr[displayedProductLeft]

    displayedProductCenter = Math.floor(Math.random() * productsArr.length);
    while (displayedProductCenter === displayedProductLeft || displayedProductCenter === displayedProductRight) {
        displayedProductCenter = Math.floor(Math.random() * productsArr.length);
    }
    var productCenterPosition = objectsArr[displayedProductCenter]

    displayedProductRight = Math.floor(Math.random() * productsArr.length);
    while (displayedProductRight === displayedProductCenter || displayedProductRight === displayedProductLeft) {
        displayedProductRight = Math.floor(Math.random() * productsArr.length);
    }
    var displayedCenterRight = objectsArr[displayedProductRight]

    displayLeft.setAttribute('src', productLeftPosition.url)
    displayCenter.setAttribute('src', productCenterPosition.url)
    displayRight.setAttribute('src', displayedCenterRight.url)

}

displayRandomProducts();

displayLeft.addEventListener('click', leftClick);
displayCenter.addEventListener('click', centerClick);
displayRight.addEventListener('click', rightClick);

function clicks() {
    totalClicks += 1;
    objectsArr[displayedProductLeft].timeDisplayed += 1;
    objectsArr[displayedProductCenter].timeDisplayed += 1;
    objectsArr[displayedProductRight].timeDisplayed += 1;
    if (totalClicks < 25) {
        var clickedElement = event.target.id
    } else {

        var resultsList = document.getElementById('finalResults');

        for (let i = 0; i < objectsArr.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = objectsArr[i].name + ' had ' + objectsArr[i].clicked + ' votes and was shown ' + objectsArr[i].timeDisplayed + ' times.'
            resultsList.appendChild(listItem);
        }
        displayLeft.removeEventListener('click', leftClick);
        displayCenter.removeEventListener('click', centerClick);
        displayRight.removeEventListener('click', rightClick);
    }
    console.log(clickedElement);
    displayRandomProducts();
}

function leftClick(event) {
    objectsArr[displayedProductLeft].clicked += 1;
    clicks();
}

function centerClick(event) {
    objectsArr[displayedProductCenter].clicked += 1;
    clicks();
}

function rightClick(event) {
    objectsArr[displayedProductRight].clicked += 1;
    clicks();
}