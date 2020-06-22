'use strict';

var productsArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg',
    'juice-glass.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg',
    'usb.gif', 'water-can.jpg'
];

var objectsArr = [];

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
var previousProducts = [];

function displayRandomProducts() {


    displayedProductLeft = Math.floor(Math.random() * productsArr.length);
    var productLeftPosition = objectsArr[displayedProductLeft];
    for (var z = 0; z < previousProducts.length; z++) {
        if (productLeftPosition === previousProducts[z]) {
            displayedProductLeft = Math.floor(Math.random() * productsArr.length);
            var productLeftPosition = objectsArr[displayedProductLeft];
        }
    }
    previousProducts.push(productLeftPosition);

    displayedProductCenter = Math.floor(Math.random() * productsArr.length);
    var productCenterPosition = objectsArr[displayedProductCenter];
    for (var i = 0; i < previousProducts.length; i++) {
        if (productCenterPosition === previousProducts[i]) {
            displayedProductCenter = Math.floor(Math.random() * productsArr.length);
            var productCenterPosition = objectsArr[displayedProductCenter];
        }
    }
    previousProducts.push(productCenterPosition);

    displayedProductRight = Math.floor(Math.random() * productsArr.length);
    var productRightPosition = objectsArr[displayedProductRight];
    for (var x = 0; x < previousProducts.length; x++) {
        if (productRightPosition === previousProducts[x]) {
            displayedProductRight = Math.floor(Math.random() * productsArr.length);
            var productRightPosition = objectsArr[displayedProductRight];
        }
    }

    previousProducts.push(productRightPosition);

    displayLeft.setAttribute('src', productLeftPosition.url);
    displayCenter.setAttribute('src', productCenterPosition.url);
    displayRight.setAttribute('src', productRightPosition.url);

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
    if (totalClicks <= 25) {
        var clickedElement = event.target.id
    } else {

        // var resultsList = document.getElementById('finalResults');

        // for (let i = 0; i < objectsArr.length; i++) {
        //     var listItem = document.createElement('li');
        //     var res = objectsArr[i].name.substring(0, objectsArr[i].name.length - 4);
        //     listItem.textContent = res + ' had ' + objectsArr[i].clicked + ' votes and was shown ' + objectsArr[i].timeDisplayed + ' times.'
        //     resultsList.appendChild(listItem);
        // }
        displayLeft.removeEventListener('click', leftClick);
        displayCenter.removeEventListener('click', centerClick);
        displayRight.removeEventListener('click', rightClick);
        renderChart();
        // console.log(productsNames);
        console.log(productsViews);


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



function renderChart() {

    var productsNames = [];
    var productsClicks = [];
    var productsViews = [];

    for (var i = 0; i < objectsArr.length; i++) {
        var productName = objectsArr[i].name.substring(0, objectsArr[i].name.length - 4);
        productsNames.push(productName);
        var productLikes = objectsArr[i].clicked;
        productsClicks.push(productLikes);
        var productView = objectsArr[i].timeDisplayed;
        productsViews.push(productView);
    }

    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of Votes',
                data: productsClicks,
                backgroundColor: 'rgba(140, 43, 235)',
                borderColor: 'rgba(138, 43, 226)',
                borderWidth: 1
            }, {
                label: '# of Views',
                data: productsViews,
                backgroundColor: 'rgba(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        precision: 0,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}