'use strict';
// ----------------------------- Global variables :

var productsArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
    'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg',
    'juice-glass.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg',
    'usb.gif', 'water-can.jpg'
];

var objectsArr = [];
var totalClicks = 0;
var displayedProductLeft;
var displayedProductCenter;
var displayedProductRight;
var displayLeft = document.getElementById('displayLeft');
var displayCenter = document.getElementById('displayCenter');
var displayRight = document.getElementById('displayRight');
var previousProducts = [];

// ----------------------------- Constructor :

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.clicked = 0;
    this.timeDisplayed = 0;
    objectsArr.push(this);

}

// ----------------------------- making the objects array :

for (var i = 0; i < productsArr.length; i++) {
    new Product(productsArr[i], "img/" + productsArr[i])
}


var storageObj = [];



report(); //make the chart according to the local storage data
displayRandomProducts();

// console.log(objectsArr);

// -------------------------- variables to display random images

function displayRandomProducts() {
    // console.log('display', objectsArr.length);

    displayedProductLeft = randomNum();
    var productLeftPosition = objectsArr[displayedProductLeft];
    while (previousProducts.includes(productLeftPosition)) {
        displayedProductLeft = randomNum();
        var productLeftPosition = objectsArr[displayedProductLeft];
    }

    displayedProductCenter = randomNum();
    var productCenterPosition = objectsArr[displayedProductCenter];
    while (productCenterPosition === productLeftPosition || previousProducts.includes(productCenterPosition)) {
        displayedProductCenter = randomNum();
        var productCenterPosition = objectsArr[displayedProductCenter];
    }

    displayedProductRight = randomNum();
    var productRightPosition = objectsArr[displayedProductRight];
    while (productRightPosition === productCenterPosition || productRightPosition === productLeftPosition || previousProducts.includes(productRightPosition)) {
        displayedProductRight = randomNum();
        var productRightPosition = objectsArr[displayedProductRight];
    }
    // console.log(previousProducts);
    previousProducts = [];

    previousProducts.push(productLeftPosition);
    previousProducts.push(productCenterPosition);
    previousProducts.push(productRightPosition);


    displayLeft.setAttribute('src', productLeftPosition.url);
    displayCenter.setAttribute('src', productCenterPosition.url);
    displayRight.setAttribute('src', productRightPosition.url);

}

displayLeft.addEventListener('click', leftClick);
displayCenter.addEventListener('click', centerClick);
displayRight.addEventListener('click', rightClick);

function clicks() {
    totalClicks += 1;
    localStorage.setItem("totalclicks", totalClicks);
    console.log(totalClicks)
        // console.log('displayedProductCenter', displayedProductCenter);
    objectsArr[displayedProductLeft].timeDisplayed += 1;
    store(objectsArr[displayedProductLeft]);
    objectsArr[displayedProductCenter].timeDisplayed += 1;
    store(objectsArr[displayedProductCenter]);
    objectsArr[displayedProductRight].timeDisplayed += 1;
    store(objectsArr[displayedProductRight]);
    if (totalClicks <= 25) {
        var clickedElement = event.target.id;

    } else {

        // var resultsList = document.getElementById('finalResults');

        // for (let i = 0; i < objectsArr.length; i++) {
        //     var listItem = document.createElement('li');
        //     var res = objectsArr[i].name.substring(0, objectsArr[i].name.length - 4);
        //     listItem.textContent = res + ' had ' + objectsArr[i].clicked + ' votes and was shown ' + objectsArr[i].timeDisplayed + ' times.'
        //     resultsList.appendChild(listItem);
        // }
        totalClicks = 0;
        localStorage.setItem("totalclicks", totalClicks);
        displayLeft.removeEventListener('click', leftClick);
        displayCenter.removeEventListener('click', centerClick);
        displayRight.removeEventListener('click', rightClick);
        renderChart();
        // console.log(productsNames);



    }
    // console.log(clickedElement);
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

function store(item) {
    // console.log("test", item)
    var results = JSON.stringify(item);
    localStorage.setItem(item.name, results);
}


function report() {
    if (localStorage.length == 0) {
        console.log('there is none');
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            var Key = localStorage.key(i);
            if (Key !== 'totalclicks') {
                var Item = JSON.parse(localStorage.getItem(Key));
            }

            storageObj.push(Item)
        }
        // console.log(storageObj);
        objectsArr = storageObj;
        var tc = Number(localStorage.getItem("totalclicks"));
        totalClicks = tc;
        console.log("report", totalClicks);
        // totalClicks = Number(localStorage.getItem("totalClicks"));
        // console.log("report", objectsArr.length);

        renderChart()
    }

}

function randomNum() {
    // console.log("random", objectsArr.length);
    return Math.floor(Math.random() * objectsArr.length);
}

function renderChart() {

    var productsNames = [];
    var productsClicks = [];
    var productsViews = [];
    // console.log('render', objectsArr.length);
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
                backgroundColor: 'rgba(140, 215, 144 , 0.7)',
                borderColor: 'rgba(140, 215, 144)',
                borderWidth: 1
            }, {
                label: '# of Views',
                data: productsViews,
                backgroundColor: 'rgba(40, 89, 67 , 0.7)',
                borderColor: 'rgba(40, 89, 67)',
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