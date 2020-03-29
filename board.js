/*eslint-env browser*/

var canvas, context;
var rules;
var rowValues;
var currentRow = 0;
var timer = 0;

window.onload = function() {
    canvas = document.getElementById("board");
    context = canvas.getContext("2d");
    let SQUARE_SIZE = canvas.height / 5;
    let NUMBER_OF_SQUARES = 5 * 5;
    console.log("Size of each square = " + SQUARE_SIZE + "px");

    rowValues = [1, 0, 1, 0, 2, 1, 2, 1];       // TODO initialization
    // TODO start button
    if (!timer) {
        timer = setTimeout(drawLine, 500);
    }

    initRulesMap();
};

function drawLine() {
    const squareSize = 50;

    if ((currentRow + 1) * squareSize < canvas.height) {
        currentRow++;
    } else {
        let data = context.getImageData(0, 50, canvas.width, canvas.height);
        context.putImageData(data, 0, 0);
    }

    for (let i = 0; i < rowValues.length; i++) {
        if (rowValues[i] === 0) {
            context.fillStyle = "#d12e51";  // red
        } else if (rowValues[i] === 1) {
            context.fillStyle = "#dbc430";  // green
        } else if (rowValues[i] === 2) {
            context.fillStyle = "#2f85d1";  // blue
        }
        let xOffset = i * squareSize;
        let yOffset = currentRow * squareSize;
        context.fillRect(xOffset, yOffset, squareSize, squareSize);
        context.strokeRect(xOffset, yOffset, squareSize, squareSize)   // draw the border around the cell
    }

    calculateRowValues();
    if (timer) {
        timer = setTimeout(drawLine, 500);
    }
}

function calculateRowValues() {
    rowValues = [];
    for (let i = 0; i < 8; i++) {
        rowValues.push(getRandomInt(3))
    }
}

function initRulesMap() {
    let arr = [];

    for (let i = 0; i < 27; i++) {
        let ruleNumber = decimalToTrinary(i);
        arr.push([ruleNumber, 1]);
    }
    rules = new Map(arr);
}

function trinaryToDecimal(tri) {
    let triStr = tri.toString();
    let val3 = triStr[0];
    let val2 = triStr[1];
    let val1 = triStr[2];

    return val3 *3*3 + val2 *3 + val1*1;
}

function decimalToTrinary(dec) {
    let val3 = parseInt(dec / 9);
    dec -= val3 * 9;
    let val2 = parseInt(dec / 3);
    dec -= val2 * 3;
    let val1 = dec;
    return '' + val3 + val2 + val1;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function changeText(name) {
    document.getElementById(name).innerHTML = Date();
    document.getElementById(name).style.fontSize = "25px";
    document.getElementById(name).style.color = "red";
    document.getElementById(name).style.backgroundColor = "yellow";
}