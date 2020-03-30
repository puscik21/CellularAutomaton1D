/*eslint-env browser*/

var canvas, context;
var rules;
var rowValues;
var currentRow = -1;
var timer = 0;
var cellsPerRow;
var isPaused = true;
var rulesTable;

window.onload = function() {
    canvas = document.getElementById("board");
    context = canvas.getContext("2d");
    initRulesMap();
    initRulesTable();
};

function initRulesTable() {
    rulesTable = document.getElementById('rules-table').getElementsByTagName('tbody')[0];

    let arr = Array.from(rules.keys());
    for (let i = 0; i < 27; i++) {
        addRuleRow(arr[i], i);
    }
}

function addRuleRow(ruleStr, i) {
    let squareSize = 50;
    let lastRow;
    if (i % 3 === 0) {
        lastRow = rulesTable.insertRow(rulesTable.rows.length);
    } else {
        lastRow = rulesTable.rows[rulesTable.rows.length - 1];
    }

    let labelCell = lastRow.insertCell();
    let ruleNumber = document.createTextNode(ruleStr);
    labelCell.appendChild(ruleNumber);

    let canvasCell = lastRow.insertCell();
    let ruleCanvas = document.createElement('canvas');
    let canvasContext = ruleCanvas.getContext("2d");
    for (let i = 0; i < 3; i++) {
        canvasContext.fillStyle = getColorForValue(parseInt(ruleStr[i]));
        canvasContext.fillRect(i * squareSize, 0, squareSize, squareSize);
        canvasContext.strokeRect(i * squareSize, 0, squareSize, squareSize)   // draw the border around the cell
    }

    let ruleResult = rules.get(ruleStr);
    canvasContext.fillStyle = getColorForValue(ruleResult);
    canvasContext.fillRect(squareSize, squareSize, squareSize, squareSize);
    canvasContext.strokeRect(squareSize, squareSize, squareSize, squareSize);  // draw the border around the cell

    ruleCanvas.id = 'canvas' + 1;   // proper value (if needed)
    canvasCell.appendChild(ruleCanvas);
}

function start() {
    if (isPaused && document.getElementById('cellsPerRow').value !== '') {
        cellsPerRow = document.getElementById('cellsPerRow').value;
        initRowValues();
        timer = setTimeout(drawLine, 500);
        isPaused = false;
    }
}

function initRowValues() {
    rowValues = [];
    for (let i = 0; i < cellsPerRow; i++) {
        rowValues.push(getRandomInt(3));
    }
}

function pause() {
    if (!isPaused) {
        clearTimeout(timer);
        isPaused = true;
    }
}

function clearCanvas() {
    if (isPaused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    currentRow = -1;
}

function drawLine() {
    const squareSize = canvas.width / cellsPerRow;
    if ((currentRow + 1) * squareSize < canvas.height) {
        currentRow++;
    } else {
        let data = context.getImageData(0, squareSize, canvas.width, canvas.height);
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
        context.strokeRect(xOffset, yOffset, squareSize, squareSize);   // draw border around the cell
    }

    calculateRowValues();
    if (!isPaused) {
        timer = setTimeout(drawLine, 500);
    }
}

function calculateRowValues() {
    let temp = [];
    let rowSize = rowValues.length;
    for (let i = 1; i < rowSize - 1; i++) {
        temp[i] = countCellValue('' + rowValues[i-1] + rowValues[i] + rowValues[i+1]);
    }
    temp[0] = countCellValue('' + rowValues[rowSize-1] + rowValues[0] + rowValues[1]);
    temp[rowSize - 1] = countCellValue('' + rowValues[rowSize-2] + rowValues[rowSize-1] + rowValues[0]);
    rowValues = temp;
}

function countCellValue(ruleValue) {
    return rules.get(ruleValue);
}

function initRulesMap() {
    let arr = [];

    // for (let i = 0; i < 27; i++) {
    //     let ruleNumber = decimalToTrinary(i);
    //     arr.push([ruleNumber, 1]);
    // }

    // for test purposes only
    arr.push(['000', 0]);
    arr.push(['001', 0]);
    arr.push(['002', 0]);
    arr.push(['010', 0]);
    arr.push(['011', 0]);
    arr.push(['012', 0]);
    arr.push(['020', 0]);
    arr.push(['021', 0]);
    arr.push(['022', 0]);
    arr.push(['100', 1]);
    arr.push(['101', 1]);
    arr.push(['102', 1]);
    arr.push(['110', 1]);
    arr.push(['111', 1]);
    arr.push(['112', 1]);
    arr.push(['120', 1]);
    arr.push(['121', 1]);
    arr.push(['122', 1]);
    arr.push(['200', 2]);
    arr.push(['201', 2]);
    arr.push(['202', 2]);
    arr.push(['210', 2]);
    arr.push(['211', 2]);
    arr.push(['212', 2]);
    arr.push(['220', 2]);
    arr.push(['221', 2]);
    arr.push(['222', 2]);

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

function getColorForValue(value) {
    if (value === 0) {
        return "#d12e51";  // red
    } else if (value === 1) {
        return "#dbc430";  // green
    } else if (value === 2) {
        return "#2f85d1";  // blue
    }
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